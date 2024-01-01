import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Kitchen } from '@prisma/client';
import { AccountStatus } from 'src/config/constants/account.constants';
import { KitchenStatus } from 'src/config/constants/kitchen.constants';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class KitchenService {
  constructor(private _dbService: DatabaseService) {}

  async createKitchen(kitchen: any) {
    try {
      let is_kitchen_available = await this._dbService.kitchen.findFirst({
        where: { name: kitchen.name },
      });
      if (is_kitchen_available) {
        throw new BadRequestException('Kitchen with this name already exists');
      }
      let account_available;
      try {
        account_available = await this._dbService.snappyAccount.findFirst({
          where: { id: kitchen.account_id },
        }); // 3 => active
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!account_available) {
        throw new BadRequestException('Invalid account_id');
      }
      if (account_available.status !== AccountStatus.Active) {
        // 3 => active
        throw new BadRequestException('Account status is currently not active');
      }
      let createKitchen;
      try {
        createKitchen = await this._dbService.$queryRaw`
        INSERT INTO "public"."Kitchen" (name, address, account_id, coords)
        VALUES (
          ${kitchen.name},
          ${kitchen.address},
          ${kitchen.account_id},
          ST_SetSRID(ST_MakePoint(${kitchen.longitude}, ${kitchen.latitude}), 4326)::text  -- Explicitly cast to text
        )
        RETURNING *;
      `;
        // createKitchen = await this._dbService.$queryRaw`INSERT INTO Kitchen (name, address, account_id, coords) VALUES (${kitchen.name}, ${kitchen.address}, ${kitchen.account_id}, ST_SetSRID(ST_MakePoint(${kitchen.longitude}, ${kitchen.latitude}), 4326)) RETURNING *;`
      } catch (error) {
        throw new BadRequestException(error.message);
      }

      return {
        success: true,
        kitchen: createKitchen,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getKitchens(): Promise<Kitchen[]>{
    try {
      let kitchens: Kitchen[];
      try {
        kitchens = await this._dbService.kitchen.findMany({where: {status: KitchenStatus.Active}})
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return kitchens
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getKitchenById(id: number): Promise<Kitchen>{
    try {
      let kitchen: Kitchen;
      try {
        kitchen = await this._dbService.kitchen.findUnique({where: {id}})
      } catch (error) {
        throw new BadRequestException(error.message)
      }
      if(!kitchen){
        throw new NotFoundException(`Kitchen not found`)
      }

      return kitchen
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateKitchen(data: any, id: string): Promise<{ success: boolean }> {
    try {
      let kitchen;
      try {
        kitchen = await this._dbService.kitchen.findFirst({
          where: { id: parseInt(id) },
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!kitchen) {
        throw new NotFoundException('Invalid Kitchen id');
      }
      try {
        await this._dbService.kitchen.update({
          where: { id: parseInt(id) },
          data: { 
                ...(data.name && {name: data.name}),
                ...(data.address && {address: data.address})
            },
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteKitchen(data: any, id: string): Promise<{ success: boolean }> {
    try {
      let kitchen;
      try {
        kitchen = await this._dbService.kitchen.findFirst({
          where: { id: parseInt(id) },
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!kitchen) {
        throw new NotFoundException('Invalid Kitchen id');
      }
      try {
        await this._dbService.kitchen.delete({where: { id: parseInt(id) }});
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
