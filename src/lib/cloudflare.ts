import { env } from './env';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class CloudflareClient {
  private r2 = new S3Client({
    region: 'auto',
    endpoint: env.R2_ENDPOINT,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY,
      secretAccessKey: env.R2_SECRET_KEY,
    },
  });

  async getSignedUrl(fileKey: string, contentType: string) {
    const signedUrl = await getSignedUrl(
      this.r2,
      new PutObjectCommand({
        Bucket: 'rabbit-dev',
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 600 },
    );

    return signedUrl;
  }
}

export const r2Client = new CloudflareClient();
