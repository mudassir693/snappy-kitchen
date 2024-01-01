import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { DatabaseService } from "src/database/database.service";
import { MealController } from "./meal.controller";
import { MealService } from "./meal.service";

@Module({
    imports: [DatabaseModule],
    providers: [MealService],
    controllers: [MealController]
})
export class MealModule {}