import 'dotenv/config';
import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import { CsvsService } from './csvs/csvs.service';
import { AttachmentsService } from './attachments/attachments.service';
import { v4 as uuidv4 } from 'uuid';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';
// import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('App');
  logger.verbose('Starting application...');

  const agent = createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,
  })
    // Create your SQL datasource
    .addDataSource(createSqlDataSource(process.env.DATABASE_URL));

  agent.customizeCollection('Tabela', (collection) =>
    collection.addAction('Upload CSV', {
      scope: 'Global',
      form: [
        {
          label: 'Nova Tabela',
          description: 'O Arquivo CSV com os novos dados da tabela.',
          type: 'File',
          isRequired: true,
        },
      ],
      execute: async (context, resultBuilder) => {
        const multerFile = {
          buffer: context.formValues['Nova Tabela'].buffer,
          originalname: 'file.csv', // você pode extrair o nome original do arquivo do contexto se necessário
        };
        await csvsService.processCsv(multerFile as Express.Multer.File);

        return resultBuilder.success('Tabela Atualizada', {
          invalidated: ['Tabelas'],
        });
      },
    }),
  );

  agent.customizeCollection('Attachment', (collection) =>
    collection.addAction('Upload File', {
      scope: 'Global',
      form: [
        {
          label: 'Novo Anexo',
          description: 'O Arquivo a ser anexado no dashboard.',
          type: 'File',
          isRequired: true,
        },
      ],
      execute: async (context, resultBuilder) => {
        const fileBuffer = context.formValues['Novo Anexo'].buffer;

        const multerFile = {
          uniqueFilename: `${Date.now()}-${uuidv4()}-${
            context.formValues['Novo Anexo'].name
          }`,
          originalFilename: context.formValues['Novo Anexo'].name,
          fileSize: fileBuffer.length,
        };

        // Ensure the /files directory exists
        const directoryPath = path.join(__dirname, '..', '..', 'files');
        fs.mkdirSync(directoryPath, { recursive: true });

        // Write the file to the /files folder
        const filePath = path.join(directoryPath, multerFile.uniqueFilename);
        fs.writeFile(filePath, fileBuffer, (error) => {
          if (error) {
            console.error('Error writing file:', error);
            return resultBuilder.error('Failed to write file.');
          }
        });

        await attachmentService.create(multerFile);
      },
    }),
  );

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  await agent.mountOnNestJs(app).start();

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        /\.forestadmin\.com$/,
        /\.vercel\.app$/,
        /^http:\/\/localhost:\d{4}/,
      ];

      if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'files'), {
    prefix: '/public',
  });

  const csvsService = app.get(CsvsService);
  const attachmentService = app.get(AttachmentsService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(3000);
  logger.verbose('Application started successfully');
}

bootstrap();
