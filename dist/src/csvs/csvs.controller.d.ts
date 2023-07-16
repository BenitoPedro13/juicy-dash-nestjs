/// <reference types="multer" />
import { CsvsService } from './csvs.service';
export declare class CsvsController {
    private readonly csvsService;
    constructor(csvsService: CsvsService);
    uploadCsv(file: Express.Multer.File): Promise<void>;
    getAllData(): Promise<any[]>;
}
