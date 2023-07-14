import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
// import { ExistsInDbConstraint } from './exists-in-db/ExistsInDbConstraint';
// import { CategoriesService } from './categories/categories.service';
import { CsvsModule } from './csvs/csvs.module';
import { MulterModule } from '@nestjs/platform-express';
import { CorsModule } from '@nestjs/express';

@Module({
  imports: [
    CorsModule,
    CategoriesModule,
    PrismaModule,
    ProductsModule,
    MulterModule.register({
      dest: './uploads', // Specify the destination path for uploaded files
    }),
    CsvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
