import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
export declare class AttachmentsService {
    create(createAttachmentDto: CreateAttachmentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAttachmentDto: UpdateAttachmentDto): string;
    remove(id: number): string;
}
