import { FastifyRequest } from 'fastify';
import { FileRepository } from '../repository/fileRepository';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { CloudflareClient } from '../lib/cloudflare';

export class UploadService {
  constructor(
    private files: FileRepository,
    private r2Client: CloudflareClient,
  ) {}

  async saveFile(request: FastifyRequest) {
    const uploadBodySchema = z.object({
      name: z.string().min(1),
      contentType: z.string().regex(/\w+\/[-+.\w]+/),
    });

    const { contentType, name } = uploadBodySchema.parse(request.body);
    const fileKey = randomUUID().concat('-').concat(name);

    await this.files.saveFile(name, contentType, fileKey);
    return await this.r2Client.getSignedUrl(fileKey, contentType);
  }
}
