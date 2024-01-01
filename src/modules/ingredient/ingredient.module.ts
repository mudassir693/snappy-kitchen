import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { DatabaseService } from "src/database/database.service";
import { IngredientController } from "./ingredient.controller";
import { IngredientService } from "./ingredient.service";

@Module({
    imports: [DatabaseModule],
    providers: [IngredientService],
    controllers: [IngredientController]
})
export class IngredientModule {}