import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { JwtStrategy } from './modules/passport/strategies/jwt.strategies';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule } from './rabbitmq/rabbitmq.module';
import { AccountModule } from './modules/account/account.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { MealModule } from './modules/meal/meal.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';

@Module({
  imports: [
    KitchenModule,
    AccountModule,
    SubscriptionModule,
    MealModule,
    IngredientModule,
    NutritionModule,
    // RmqModule,
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      // signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
