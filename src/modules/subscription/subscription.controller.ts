import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { JwtAuthGuard } from "../passport/guards/jwt.guard";
import { Subscription } from "@prisma/client";

@Controller('subscription')
export class SubscriptionController {
    constructor(private _subscriptionService: SubscriptionService){}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createSubscription(@Body() data: any, @Request() req: any){
        let create_subscription = await this._subscriptionService.createSubscription(data)
        return {
            token: req.user.token,
            create_subscription
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/:id')
    async getSubscriptionById(@Param("id") id: string, @Request() req: any): Promise<any>{
        let subscription: Subscription = await this. _subscriptionService.getSubscriptionById(id)
        return {
            token: req.user.token,
            subscription
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/kitchen/:id')
    async getSubscriptionByKitchenId(@Param("id") id: string, @Request() req: any): Promise<any>{
        let subscriptions: Subscription[] = await this._subscriptionService.getSubscriptionByKitchenId(parseInt(id))
        return {
            token: req.user.token,
            subscriptions
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateSubscription(@Param("id") id: string, @Body() data: any, @Request() req:any){
        let updateSubscription = await this._subscriptionService.updateSubscription(parseInt(id), data)
        return {
            token: req.user.token,
            updateSubscription
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async deleteSubscription(@Param("id") id: string, @Request() req: any){
        let deleteSubscription = await this._subscriptionService.deleteSubscription(parseInt(id))
        return {
            token: req.user.token,
            deleteSubscription
        }
    }
}