"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const csvs_service_1 = require("./csvs.service");
const multer_1 = require("multer");
let CsvsController = exports.CsvsController = class CsvsController {
    constructor(csvsService) {
        this.csvsService = csvsService;
    }
    async uploadCsv(file) {
        await this.csvsService.processCsv(file);
    }
    async getAllData() {
        return this.csvsService.getAllData();
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.MulterFile !== "undefined" && multer_1.MulterFile) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], CsvsController.prototype, "uploadCsv", null);
__decorate([
    (0, common_1.Get)('data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CsvsController.prototype, "getAllData", null);
exports.CsvsController = CsvsController = __decorate([
    (0, common_1.Controller)('csvs'),
    __metadata("design:paramtypes", [csvs_service_1.CsvsService])
], CsvsController);
//# sourceMappingURL=csvs.controller.js.map