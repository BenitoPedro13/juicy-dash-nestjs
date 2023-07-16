import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CsvsModule } from './csvs/csvs.module';
// import { MulterModule } from '@nestjs/platform-express';
import { AttachmentsModule } from './attachments/attachments.module';

@Module({
  imports: [PrismaModule, CsvsModule, AttachmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
