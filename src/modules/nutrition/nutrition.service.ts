import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class NutritionService {
    constructor(private _dbService: DatabaseService){}

    async createNutrition(data: any){
        try {
            let is_meal_available;
            try {
                is_meal_available = await this._dbService.meal.findUnique({where: {id: data.meal_id}})
            } catch (error) {
                throw new NotFoundException(error.message)
            }
            if(!is_meal_available){
                throw new NotFoundException("invalid Meal Id")
            }
            let create_nutrition;
            try {
                create_nutrition = await this._dbService.nutrition.create({
                    data:{
                        ...(data.calories && {calories:data.calories}),
                        ...(data.fat && {fat:data.fat}),
                        ...(data.saturated_fat && {saturated_fat:data.saturated_fat}),
                        ...(data.carbohydrate && {carbohydrate:data.carbohydrate}),
                        ...(data.sugar && {sugar:data.sugar}),
                        ...(data.dietary_fiber && {dietary_fiber:data.dietary_fiber}),
                        ...(data.protine && {protine:data.protine}),
                        ...(data.cholesterol && {cholesterol:data.cholesterol}),
                        ...(data.sodium && {sodium:data.sodium}),
                        meal_id: data.meal_id
                    }
                })
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            return {
                success: true,
                create_nutrition
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}