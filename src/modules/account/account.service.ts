import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class AccountService {
    constructor(private _dbService: DatabaseService){}

    async createAccount(data: any):Promise<void>{
        await this._dbService.snappyAccount.create({
            data
        })
    }
}