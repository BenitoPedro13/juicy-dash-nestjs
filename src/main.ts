import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { useContainer } from 'class-validator';
// import { CsvsService } from './csvs/csvs.service';

async function bootstrap() {
  const logger = new Logger('App');
  logger.verbose('Starting application...');

  // agent.customizeCollection('Tabela', (collection) =>
  //   collection.addAction('Upload CSV', {
  //     scope: 'Global',
  //     form: [
  //       {
  //         label: 'Nova Tabela',
  //         description: 'O Arquivo CSV com os novos dados da tabela.',
  //         type: 'File',
  //         isRequired: true,
  //       },
  //     ],
  //     execute: async (context, resultBuilder) => {
  //       const multerFile = {
  //         buffer: context.formValues['Nova Tabela'].buffer,
  //         originalname: 'file.csv', // você pode extrair o nome original do arquivo do contexto se necessário
  //       };
  //       await csvsService.processCsv(multerFile);

  //       return resultBuilder.success('Tabela Atualizada', {
  //         invalidated: ['Tabelas'],
  //       });
  //     },
  //   }),
  // );

  // const httpsOptions = {
  //   key: fs.readFileSync('./server.key'),
  //   cert: fs.readFileSync('./server.crt'),
  // };

  // const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '/*/', // ou o domínio que você quer permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // const csvsService = app.get(CsvsService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  await app.listen(3000);
  // await agent.mountOnNestJs(app).start();

  logger.verbose('Application started successfully');
}

bootstrap();
