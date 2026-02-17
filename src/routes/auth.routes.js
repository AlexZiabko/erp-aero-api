/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { Router } from 'express';
import { signup, signin, refreshToken, logout, info } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signin/new_token', refreshToken);
router.get('/logout', authMiddleware, logout);
router.get('/info', authMiddleware, info);

export default router;
