import { Module } from "@nestjs/common";
import { KitchenController } from "./kitchen.controller";
import { RmqModule } from "src/rabbitmq/rabbitmq.module";
import { KitchenService } from "./kitchen.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [RmqModule, DatabaseModule],
    providers: [KitchenService],
    controllers:[KitchenController],
    exports: []
})

export class KitchenModule {}