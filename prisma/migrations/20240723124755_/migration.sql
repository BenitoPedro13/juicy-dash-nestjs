-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "attachmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
