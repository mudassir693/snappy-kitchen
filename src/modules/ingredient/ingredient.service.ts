import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class IngredientService {
    constructor(private _dbService: DatabaseService) {}

    async createIngredient(data: any) {
        try {
            const meal = await this._dbService.meal.findUnique({
                where: { id: data.meal_id }
            });

            if (!meal) {
                throw new NotFoundException("invalid Meal Id");
            }

            const create_ingredient = await this._dbService.ingredient.create({
                data: {
                    name: data.name,
                    description: data.description,
                    meal_id: data.meal_id
                }
            });

            return {
                success: true,
                create_ingredient
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
// aws_key = 'aws_asdhefb0248237492-a8w49-12314ajksd'
