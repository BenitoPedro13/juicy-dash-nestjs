import { CsvsService } from './csvs.service';
import { MulterFile } from 'multer';
export declare class CsvsController {
    private readonly csvsService;
    constructor(csvsService: CsvsService);
    uploadCsv(file: MulterFile): Promise<void>;
    getAllData(): Promise<any[]>;
}
