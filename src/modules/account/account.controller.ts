import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccountService } from "./account.service";
import { RmqService } from "src/rabbitmq/rabbitmq.service";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AccountController {
    constructor(private _configService: ConfigService, private _accountService: AccountService, private _rmqService: RmqService) {}

    @EventPattern('account_created')
    async accountCreated(@Payload() data: any, @Ctx() context: RmqContext){
        await this._accountService.createAccount(data)
        this._rmqService.ack(context);
    }
}