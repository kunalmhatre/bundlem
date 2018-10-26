import express from 'express';
import path from 'path';
import router from './router';

const fileAssets = express.static(
	path.join(__dirname, '../../build')
);

const app = express()
	.use(fileAssets)
	.use('/', router)

export default app;