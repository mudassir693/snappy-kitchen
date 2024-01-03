import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Subscription } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class SubscriptionService {
    constructor(private _dbService: DatabaseService, @Inject("BILLING") private _billingClient: ClientProxy){}

    async createSubscription(data: any){
        try {
            let is_kitchen_available;
            try {
                is_kitchen_available = await this._dbService.kitchen.findUnique({where: {id: data.id}})
            } catch (error) {
                throw new NotFoundException(error.message)
            }
            if(!is_kitchen_available){
                throw new NotFoundException("invalid Kitchen Id")
            }
            let create_subscription;
            try {
                create_subscription = await this._dbService.subscription.create({
                    data:{
                        name:data.name,
                        description:data.description,
                        type: data.type,
                        plan_type: data.plan_type,
                        price: data.price,
                        kitchen_id: data.kitchen_id,
                        allowedUser: 100
                    }
                })
                this._billingClient.emit('subscription_create', create_subscription)
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            return {
                success: true,
                create_subscription
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async getSubscriptionById(id: string): Promise<Subscription>{
        try {
            let subscription: Subscription;
            try {
                subscription = await this._dbService.subscription.findUnique({where: {id: parseInt(id)}, include: {meals: true}})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!subscription){
                throw new NotFoundException("invalid subscription id")
            }
            return subscription
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async getSubscriptionByKitchenId(kitchen_id: number): Promise<Subscription[]>{
        try {
            let subscriptions: Subscription[];
            try {
                subscriptions = await this._dbService.subscription.findMany({where: {kitchen_id}, include: {meals: true}})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!subscriptions){
                throw new NotFoundException("invalid kitchen id")
            }
            return subscriptions
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async updateSubscription(id: number, data: any): Promise<{success: boolean}> {
        try {
            let subscription;
            try {
                subscription = await this._dbService.subscription.findUnique({where: {id: id}})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!subscription) {
                throw new NotFoundException('invalid subscription id')
            }
            await this._dbService.subscription.update({where: {id: subscription.id}, data: {
                ...(data.type && {type: data.type}),
                ...(data.price && {price: data.price})
            }})
            return {
                success: true,
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async deleteSubscription(id: number): Promise<{success: boolean}>{
        try {
            let subscription
            try {
                subscription = await this._dbService.subscription.findUnique({where: {id}})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!subscription){
                throw new NotFoundException('invalid subscription id')
            }
            await this._dbService.subscription.delete({where: {id}})
            return {
                success: true
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}