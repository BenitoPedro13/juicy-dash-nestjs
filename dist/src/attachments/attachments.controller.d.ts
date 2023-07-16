import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    create(createAttachmentDto: CreateAttachmentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAttachmentDto: UpdateAttachmentDto): string;
    remove(id: string): string;
}
