/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { Router } from 'express';
const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'User route works!' });
});

export default router;
