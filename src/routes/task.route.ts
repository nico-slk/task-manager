import { Router } from 'express';

const router = Router();

router.get('/', () => { return 'Hola mundo' });

module.exports = router;