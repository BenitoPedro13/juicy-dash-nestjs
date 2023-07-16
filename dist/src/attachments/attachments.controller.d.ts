/// <reference types="multer" />
import { AttachmentsService } from './attachments.service';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    create(file: Express.Multer.File): Promise<{
        originalFilename: string;
        message: string;
    }>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}>;
    update(id: number, updateAttachmentDto: UpdateAttachmentDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}>;
}
