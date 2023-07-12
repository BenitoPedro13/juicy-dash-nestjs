import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import { CsvsService } from './csvs/csvs.service'

async function bootstrap() {
  const agent = createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,
  })
    // Create your SQL datasource
    .addDataSource(createSqlDataSource(process.env.DATABASE_URL));

  agent.customizeCollection('Tabela', collection =>
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
        await csvsService.processCsv(multerFile);

        return resultBuilder.success('Tabela Atualizada', {
          invalidated: ['Tabelas'],
        });
      },
    }),
  );

  const app = await NestFactory.create(AppModule, { logger: false });
  const csvsService = app.get(CsvsService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
  }));

  await agent.mountOnNestJs(app).start();
  await app.listen(3000);
}
bootstrap();
