import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { IngredientService } from "./ingredient.service";
import { JwtAuthGuard } from "../passport/guards/jwt.guard";

@Controller('ingredient')
export class IngredientController {
    constructor(private _ingredientService: IngredientService){}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createIngredient(@Body() data: any, @Request() req: any){
        let create_meal = await this._ingredientService.createIngredient(data)
        return {
            token: req.user.token,
            create_meal
        }
    }
}