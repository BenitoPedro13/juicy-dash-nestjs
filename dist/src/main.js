"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const agent_1 = require("@forestadmin/agent");
const datasource_sql_1 = require("@forestadmin/datasource-sql");
const csvs_service_1 = require("./csvs/csvs.service");
async function bootstrap() {
    const logger = new common_1.Logger('App');
    logger.verbose('Starting application...');
    const agent = (0, agent_1.createAgent)({
        authSecret: process.env.FOREST_AUTH_SECRET,
        envSecret: process.env.FOREST_ENV_SECRET,
        isProduction: process.env.NODE_ENV === 'production',
        typingsPath: './typings.ts',
        typingsMaxDepth: 5,
    })
        .addDataSource((0, datasource_sql_1.createSqlDataSource)(process.env.DATABASE_URL));
    agent.customizeCollection('Tabela', (collection) => collection.addAction('Upload CSV', {
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
                originalname: 'file.csv',
            };
            await csvsService.processCsv(multerFile);
            return resultBuilder.success('Tabela Atualizada', {
                invalidated: ['Tabelas'],
            });
        },
    }));
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const csvsService = app.get(csvs_service_1.CsvsService);
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: 422,
    }));
    await app.listen(3000);
    await agent.mountOnNestJs(app).start();
    logger.verbose('Application started successfully');
}
bootstrap();
//# sourceMappingURL=main.js.map