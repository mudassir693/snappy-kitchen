import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { DatabaseService } from "src/database/database.service";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";

@Module({
    imports: [DatabaseModule],
    providers: [SubscriptionService],
    controllers: [SubscriptionController]
})
export class SubscriptionModule {}