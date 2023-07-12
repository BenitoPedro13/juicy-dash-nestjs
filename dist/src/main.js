"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
async function bootstrap() {
    const logger = new common_1.Logger('App');
    logger.verbose('Starting application...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: 422,
    }));
    await app.listen(3000);
    logger.verbose('Application started successfully');
}
bootstrap();
//# sourceMappingURL=main.js.map