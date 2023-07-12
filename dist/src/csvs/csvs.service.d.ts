import { MulterFile } from 'multer';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CsvsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    processCsv(file: MulterFile): Promise<void>;
    getAllData(): Promise<any[]>;
}
