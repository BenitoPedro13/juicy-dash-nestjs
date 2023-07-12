"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvsModule = void 0;
const common_1 = require("@nestjs/common");
const csvs_service_1 = require("./csvs.service");
const csvs_controller_1 = require("./csvs.controller");
let CsvsModule = exports.CsvsModule = class CsvsModule {
};
exports.CsvsModule = CsvsModule = __decorate([
    (0, common_1.Module)({
        controllers: [csvs_controller_1.CsvsController],
        providers: [csvs_service_1.CsvsService]
    })
], CsvsModule);
//# sourceMappingURL=csvs.module.js.map