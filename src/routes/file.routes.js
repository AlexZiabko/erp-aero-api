/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import express from 'express';
import { upload } from '../middlewares/upload.js';
import { 
  uploadFile, listFiles, getFileInfo, downloadFile, deleteFile, updateFile 
} from '../controllers/file.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.get('/list', authMiddleware, listFiles);
router.get('/:id', authMiddleware, getFileInfo);
router.get('/download/:id', authMiddleware, downloadFile);
router.delete('/delete/:id', authMiddleware, deleteFile);
router.put('/update/:id', authMiddleware, upload.single('file'), updateFile);

export default router;
