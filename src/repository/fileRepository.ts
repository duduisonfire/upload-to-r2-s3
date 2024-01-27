import { PrismaClient } from '@prisma/client';

export class FileRepository {
  private prisma = new PrismaClient();

  async saveFile(name: string, contentType: string, key: string) {
    await this.prisma.file.create({
      data: {
        name,
        contentType,
        key,
      },
    });
  }

  async getFile(id: string) {
    const file = this.prisma.file.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return await file;
  }
}

export const Files = new FileRepository();
