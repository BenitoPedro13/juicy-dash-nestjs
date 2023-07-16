/// <reference types="multer" />
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CsvsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    processCsv(file: Express.Multer.File): Promise<void>;
    getAllData(): Promise<any[]>;
}
