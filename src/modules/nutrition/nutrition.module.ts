import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { NutritionController } from "./nutrition.controller";
import { NutritionService } from "./nutrition.service";

@Module({
    imports: [DatabaseModule],
    providers: [NutritionService],
    controllers: [NutritionController]
})
export class NutritionModule {}