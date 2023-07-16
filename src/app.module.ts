import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CsvsModule } from './csvs/csvs.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './uploads', // Specify the destination path for uploaded files
    }),
    CsvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
