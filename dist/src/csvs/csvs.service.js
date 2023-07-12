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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvsService = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const stream_1 = require("stream");
let CsvsService = exports.CsvsService = class CsvsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async processCsv(file) {
        const results = [];
        const stream = stream_1.Readable.from([file.buffer.toString()]);
        await new Promise((resolve, reject) => {
            stream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve());
        });
        await this.prisma.tabela.deleteMany({});
        for (const row of results) {
            await this.prisma.tabela.create({ data: row });
        }
    }
    async getAllData() {
        return this.prisma.tabela.findMany();
    }
};
exports.CsvsService = CsvsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CsvsService);
//# sourceMappingURL=csvs.service.js.map