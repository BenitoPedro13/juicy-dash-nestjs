import { PrismaService } from '../prisma/prisma.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
export declare class AttachmentsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createAttachmentDto: CreateAttachmentDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {})[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__AttachmentClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    update(id: number, updateAttachmentDto: UpdateAttachmentDto): import(".prisma/client").Prisma.Prisma__AttachmentClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AttachmentClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        uniqueFilename: string;
        originalFilename: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
}
