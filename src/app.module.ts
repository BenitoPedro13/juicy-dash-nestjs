import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CsvsModule } from './csvs/csvs.module';
// import { MulterModule } from '@nestjs/platform-express';
import { AttachmentsModule } from './attachments/attachments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    CsvsModule,
    AttachmentsModule,
    ServeStaticModule.forRoot({
      serveRoot: 'public',
      rootPath: join(__dirname, '..', '..', 'files'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
