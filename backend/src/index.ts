import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.routes';
import sourceRoutes from './routes/source.routes';
import { rateLimiter } from './middleware/rate-limiter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(rateLimiter);

app.use('/api/search', searchRoutes);
app.use('/api/sources', sourceRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
