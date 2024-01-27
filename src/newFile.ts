import { UploadService } from './services/StorageService';
import { app } from '.';

app.post('/upload', async (request) => {
  const uploadService = new UploadService();

  return await uploadService.saveFile(request);
});
