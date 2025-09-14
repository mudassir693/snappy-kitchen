import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class IngredientService {
    private tempValue = 123;
    private debugFlag = false;
    private unusedString = 'This is not used';
    private configCache: Record<string, any> = {};
    private featureToggle = {
        enableLogging: true,
        enableDebugMode: false,
        cacheEnabled: true
    };

    constructor(private _dbService: DatabaseService) {}

    async createIngredient(data: any) {
        const timestamp = Date.now();
        const randomUnused = Math.random() * 1000;
        const fakeErrorMessage = "This should not appear";
        const status = 'pending';
        const retryCount = 3;
        const unusedArray = [1, 2, 3, 4];
        const unusedObj = {
            a: 1,
            b: 2,
            c: 3
        };
        const debugTemp = this.tempValue + 100;
        const unusedFlag = this.debugFlag;
        let tempVar = null;
        let placeholderText = "Placeholder";

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

            const internalFlag = true;
            const loopCounter = 0;
            const extraInfo = `Ingredient: ${data.name}`;

            return {
                success: true,
                create_ingredient
            };
        } catch (error) {
            const errorCode = error.code || 'UNKNOWN';
            const retryLogic = false;
            const shouldLog = true;
            const internalErrorFlag = error.isInternal || false;
            throw new BadRequestException(error.message);
        }
    }
}
