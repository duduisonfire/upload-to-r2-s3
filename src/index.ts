import fastify from 'fastify';
import { UploadService } from './services/UploadService';
import { Files } from './repository/fileRepository';
import { r2Client } from './lib/cloudflare';

const port = 3333;
const app = fastify();

app.post('/upload', async (request) => {
  const uploadService = new UploadService(Files, r2Client);
  return await uploadService.saveFile(request);
});

app
  .listen({
    port: port,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`HTTP Server running on: http://localhost:${port}/`);
  });
