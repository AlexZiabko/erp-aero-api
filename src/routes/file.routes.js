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

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/list', listFiles);
router.get('/:id', getFileInfo);
router.get('/download/:id', downloadFile);
router.delete('/delete/:id', deleteFile);
router.put('/update/:id', upload.single('file'), updateFile);

export default router;
