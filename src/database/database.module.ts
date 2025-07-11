import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";

// let password = 'Mudassir78023'
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService]
})

export class DatabaseModule {}
