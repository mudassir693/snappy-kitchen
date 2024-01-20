import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Meal, Subscription } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class MealService {
    constructor(private _dbService: DatabaseService){}

    async createMeal(data: any){
        try {
            let is_subscription_available;
            try {
                is_subscription_available = await this._dbService.subscription.findUnique({where: {id: data.subscription_id}})
            } catch (error) {
                throw new NotFoundException(error.message)
            }
            if(!is_subscription_available){
                throw new NotFoundException("invalid Subscription Id")
            }
            let create_meal;
            try {
                create_meal = await this._dbService.meal.create({
                    data:{
                        name: data.name,
                        description: data.description,
                        subscription_id: data.subscription_id,
                        kitchen_id: is_subscription_available.kitchen_id
                    }
                })
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            return {
                success: true,
                create_meal
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async updateMeal(data: any, id: any){
        try {
            let meal = await this._dbService.meal.findFirst({where: {id}})
            if(!meal){
                throw new NotFoundException()
            }
            await this._dbService.meal.update({where: {id: meal.id}, data: {
                ...(data.name && {name: data.name}),
                ...(data.description && {description: data.description}),
            }})
        } catch (error) {
            
        }
    }

    async getMealById(id): Promise<Meal>{
        try {
            let meal;
            try {
                meal = await this._dbService.meal.findUnique({where: {id: parseInt(id)}, include: {ingredients: true, nutrition: true}})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!meal){
                throw new NotFoundException("Invalid meal id")
            }
            return meal
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    // need to work here
    async getMeal(data): Promise<Meal>{
        try {
            let meal;
            let whereParams = {}
            if(data.kitchen_id){
                whereParams['kitchen_id'] = parseInt(data.kitchen_id)
            }
            try {
                meal = await this._dbService.meal.findMany({where: whereParams})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!meal){
                throw new NotFoundException("Invalid meal id")
            }
            return meal
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async getMealBySubscriptionId(id: number): Promise<Meal[]>{
        try {
            let subscription: Subscription
            try {
                subscription = await this._dbService.subscription.findFirst({where: {id}, include: {meals: true}})
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            if(!subscription){
                throw new NotFoundException('invalid subscription id')
            }

            return subscription['meals']
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}