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

  agent.customizeCollection('User', (collection) =>
    collection.addAction('Upload User Picture', {
      scope: 'Global',
      form: [
        {
          label: 'Profile Picture',
          description:
            'A imagem a ser utilizada como foto de perfil do usuario',
          type: 'File',
          isRequired: true,
        },
        {
          label: 'User',
          description: 'Usuario que recebera a foto',
          type: 'Collection',
          collectionName: 'User',
          isRequired: true,
        },
      ],
      execute: async (context, resultBuilder) => {
        console.log('context', context);
        // const multerFile = {
        //   uniqueFilename: `${Date.now()}-${uuidv4()}-${
        //     context.formValues['Upload CSV'].name
        //   }`,
        //   buffer: context.formValues['Upload CSV'].buffer,
        //   originalname: context.formValues['Upload CSV'].name, // você pode extrair o nome original do arquivo do contexto se necessário
        //   userEmail: (context.filter.conditionTree as { value: string }).value,
        // };

        // // Ensure the /files directory exists
        // const directoryPath = path.join(__dirname, '..', '..', 'files');
        // fs.mkdirSync(directoryPath, { recursive: true });

        // // Write the file to the /files folder
        // const filePath = path.join(directoryPath, multerFile.uniqueFilename);
        // fs.writeFile(filePath, multerFile.buffer, (error) => {
        //   if (error) {
        //     console.error('Error writing file:', error);
        //     return resultBuilder.error('Failed to write file.');
        //   }
        // });

        // await csvsService.processCsv(multerFile);

        // return resultBuilder.success('Performance Atualizada', {
        //   invalidated: ['Performance'],
        // });
      },
    }),
  );

  agent.customizeCollection('Performance', (collection) =>
    collection.addAction('Upload CSV', {
      scope: 'Global',
      form: [
        {
          label: 'Upload CSV',
          description: 'O Arquivo CSV com os novos dados da tabela.',
          type: 'File',
          isRequired: true,
        },
      ],
      execute: async (context, resultBuilder) => {
        const multerFile = {
          uniqueFilename: `${Date.now()}-${uuidv4()}-${
            context.formValues['Upload CSV'].name
          }`,
          buffer: context.formValues['Upload CSV'].buffer,
          originalname: context.formValues['Upload CSV'].name, // você pode extrair o nome original do arquivo do contexto se necessário
          userEmail: (context.filter.conditionTree as { value: string }).value,
        };

        // Ensure the /files directory exists
        const directoryPath = path.join(__dirname, '..', '..', 'files');
        fs.mkdirSync(directoryPath, { recursive: true });

        // Write the file to the /files folder
        const filePath = path.join(directoryPath, multerFile.uniqueFilename);
        fs.writeFile(filePath, multerFile.buffer, (error) => {
          if (error) {
            console.error('Error writing file:', error);
            return resultBuilder.error('Failed to write file.');
          }
        });

        await csvsService.processCsv(multerFile);

        return resultBuilder.success('Performance Atualizada', {
          invalidated: ['Performance'],
        });
      },
    }),
  );

  agent.customizeCollection('Attachments', (collection) =>
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
          userEmail: (context.filter.conditionTree as { value: string }).value,
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

        return resultBuilder.success('Attachments Atualizado', {
          invalidated: ['Attachments'],
        });
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
