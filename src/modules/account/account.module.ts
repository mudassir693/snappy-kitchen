import { Module } from "@nestjs/common";
import { RmqModule } from "src/rabbitmq/rabbitmq.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[RmqModule, DatabaseModule],
    providers:[AccountService],
    controllers:[AccountController],
})
export class AccountModule {}