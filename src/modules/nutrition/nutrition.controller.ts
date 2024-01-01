import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { NutritionService } from "./nutrition.service";
import { JwtAuthGuard } from "../passport/guards/jwt.guard";

@Controller('nutrition')
export class NutritionController {
    constructor(private _nutritionService: NutritionService){}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createNutrition(@Body() data: any, @Request() req: any){
        let create_meal = await this._nutritionService.createNutrition(data)
        return {
            token: req.user.token,
            create_meal
        }
    }
}