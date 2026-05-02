import { Router } from 'express';
import { handleSearch } from '../controllers/search.controller';

const router = Router();

router.post('/', handleSearch);

export default router;
