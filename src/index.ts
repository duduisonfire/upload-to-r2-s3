import fastify from 'fastify';
import { StorageService } from './services/StorageService';
import { Files } from './repository/fileRepository';
import { r2Client } from './lib/cloudflare';
import { z } from 'zod';

const port = 3333;
const app = fastify();

app.post('/uploads', async (request) => {
	const storageService = new StorageService(Files, r2Client);
	return await storageService.saveFile(request);
});

app.get('/uploads/:id', async (request) => {
	const getFileParamsSchema = z.object({
		id: z.string().cuid(),
	});

	const { id } = getFileParamsSchema.parse(request.params);
	const storageService = new StorageService(Files, r2Client);

	return storageService.getFile(id);
});

app
	.listen({
		port: port,
		host: '0.0.0.0',
	})
	.then(() => {
		console.log(`HTTP Server running on: http://localhost:${port}/`);
	});
