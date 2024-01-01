import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class IngredientService {
    constructor(private _dbService: DatabaseService){}

    async createIngredient(data: any){
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
            let create_ingredient;
            try {
                create_ingredient = await this._dbService.ingredient.create({
                    data:{
                        name: data.name,
                        description: data.description,
                        meal_id: data.meal_id
                    }
                })
            } catch (error) {
                throw new BadRequestException(error.message)
            }
            return {
                success: true,
                create_ingredient
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}