import { Router } from 'express';

const router = Router();

// In a real app, these would be saved to a DB
let sources = [
  { id: 'rs', name: 'RS Components', enabled: true },
  { id: 'e14', name: 'Element14', enabled: true }
];

router.get('/', (req, res) => {
  res.json(sources);
});

router.post('/', (req, res) => {
  const { id, enabled } = req.body;
  sources = sources.map(s => s.id === id ? { ...s, enabled } : s);
  res.json({ success: true, sources });
});

export default router;
