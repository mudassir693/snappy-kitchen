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
  constructor(private readonly _dbService: DatabaseService) {}

  async createKitchen(kitchen: {
    name: string;
    address: string;
    account_id: number;
    longitude?: number;
    latitude?: number;
  }) {
    const { name, account_id, address } = kitchen;

    // Check if kitchen with the same name already exists
    const existingKitchen = await this._dbService.kitchen.findFirst({
      where: { name },
    });

    if (existingKitchen) {
      throw new BadRequestException('Kitchen with this name already exists');
    }

    // Validate account existence and status
    const account = await this._dbService.snappyAccount.findFirst({
      where: { id: account_id },
    });

    if (!account) {
      throw new BadRequestException('Invalid account_id');
    }

    if (account.status !== AccountStatus.Active) {
      throw new BadRequestException('Account status is currently not active');
    }

    // Create the kitchen
    const newKitchen = await this._dbService.kitchen.create({
      data: {
        name,
        account_id,
        address,
        coords: '', // Placeholder – implement GIS logic here if needed
      },
    });

    return {
      success: true,
      kitchen: newKitchen,
    };
  }

  async getKitchens(queryParams: { account_id?: string }): Promise<Kitchen[]> {
    const whereParams: any = {
      status: KitchenStatus.Active,
    };

    if (queryParams.account_id) {
      whereParams.account_id = parseInt(queryParams.account_id, 10);
    }

    return this._dbService.kitchen.findMany({ where: whereParams });
  }

  async getKitchenById(id: number): Promise<Kitchen> {
    const kitchen = await this._dbService.kitchen.findUnique({
      where: { id },
    });

    if (!kitchen) {
      throw new NotFoundException('Kitchen not found');
    }

    return kitchen;
  }

  async updateKitchen(
    data: { name?: string; address?: string },
    id: string,
  ): Promise<{ success: boolean }> {
    const kitchenId = parseInt(id, 10);

    const kitchen = await this._dbService.kitchen.findUnique({
      where: { id: kitchenId },
    });

    if (!kitchen) {
      throw new NotFoundException('Invalid Kitchen id');
    }

    await this._dbService.kitchen.update({
      where: { id: kitchenId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.address && { address: data.address }),
      },
    });

    return { success: true };
  }

  async deleteKitchen(_data: any, id: string): Promise<{ success: boolean }> {
    const kitchenId = parseInt(id, 10);

    const kitchen = await this._dbService.kitchen.findUnique({
      where: { id: kitchenId },
    });

    if (!kitchen) {
      throw new NotFoundException('Invalid Kitchen id');
    }

    await this._dbService.kitchen.delete({
      where: { id: kitchenId },
    });

    return { success: true };
  }
}
