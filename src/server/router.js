import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {

	res.sendFile(
		path.join(__dirname, '../../build/index.html')
	);

});

export default router;