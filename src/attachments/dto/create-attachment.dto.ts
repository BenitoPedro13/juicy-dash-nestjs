export class CreateAttachmentDto {
  uniqueFilename: string;
  originalFilename: string;
  fileSize: number;
  userId: number; // Add the userId property to represent the owner of the attachment
}
