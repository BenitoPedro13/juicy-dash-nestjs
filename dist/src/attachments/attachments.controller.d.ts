import { AttachmentsService } from './attachments.service';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { MulterFile } from 'multer';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    create(file: MulterFile): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAttachmentDto: UpdateAttachmentDto): string;
    remove(id: string): string;
}
