import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../passport/guards/jwt.guard';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from 'src/rabbitmq/rabbitmq.service';
import { KitchenService } from './kitchen.service';
import { Kitchen } from '@prisma/client';
// controller to handle kitchen related routes
@Controller('kitchen')
export class KitchenController {
    constructor(private _kitchenService: KitchenService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async CreateKitchen(@Body() data: any, @Request() req: any): Promise<any>{
        let kitchenResponse =  await this._kitchenService.createKitchen(data)
        return {
            token: req.user.token,
            kitchenResponse
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async UpdateKitchen(@Body()data: any, @Param('id') id: string, @Request() req: any): Promise<any>{
        let kitchenResponse = await this._kitchenService.updateKitchen(data, id)
        // console.log('Hello')
        return {
            token: req.user.token,
            kitchenResponse
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get')
    async getKitchens(@Query() data: any, @Request() req: any): Promise<any>{
        let kitchens: Kitchen[] = await this._kitchenService.getKitchens(data)
        return {
            token: req.user.token,
            kitchens
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/:id')
    async GetKitchenById(@Query('id') id: number, @Request() req: any) {
        let kitchenResp = await this._kitchenService.getKitchenById(id)
        return {
            token: req.user.token,
            kitchenResp
        }
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async DeleteKitchen(@Body()data: any, @Param('id') id: string, @Request() req: any): Promise<any>{
        let kitchenResponse = await this._kitchenService.deleteKitchen(data, id)
        return {
            token: req.user.token,
            kitchenResponse
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/all')
    async DeleteKitchen(@Body()data: any, @Param('id') id: string, @Request() req: any): Promise<any>{
        // deleting all kitchens
        let kitchenResponse = await this._kitchenService.deleteAllKitchens()
        return {
            token: success
        }
    }
}
