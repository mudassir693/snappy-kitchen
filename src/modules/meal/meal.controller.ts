import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { MealService } from "./meal.service";
import { JwtAuthGuard } from "../passport/guards/jwt.guard";
import { Meal } from "@prisma/client";

@Controller('meal')
export class MealController {
    constructor(private _mealService: MealService){}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createMeal(@Body() data: any, @Request() req: any){
        let create_meal = await this._mealService.createMeal(data)
        return {
            token: req.user.token,
            create_meal
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/:id')
    async getMealById(@Param("id") id: string, @Request() req: any): Promise<any>{
        let meal = await this._mealService.getMealById(id)
        return {
            token: req.user.token,
            meal: meal
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/subscription/:subscription_id')
    async getMealBySubscription(@Param("subscription_id") id: string, @Request() req:any): Promise<any>{
        let meals = await this._mealService.getMealBySubscriptionId(parseInt(id))
        return {
            token: req.user.token,
            meals
        }
    }
}