import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { EmployeesModule } from 'src/server/app/employees/employees.module';
import { CompaniesModule } from 'src/server/app/companies/companies.module';
import { SeedService } from 'src/server/console/seed.service';
import { PartnersModule } from 'src/server/app/partners/partners.module';
import { VouchersModule } from 'src/server/app/vouchers/vouchers.module';
import { OrdersModule } from 'src/server/app/orders/orders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EmployeesModule,
    CompaniesModule,
    PartnersModule,
    VouchersModule,
    OrdersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
      port: 5432,
      username: 'postgres',
      password: '',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConsoleModule,
  ],
  providers: [SeedService, AppService],
  controllers: [AppController],
})
export class AppModule {}
