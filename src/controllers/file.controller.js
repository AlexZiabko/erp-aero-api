/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import fs from 'fs';
import path from 'path';
import { File } from '../models/File.js';

// New
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'File required' });

    const record = await File.create({
      name: path.basename(file.originalname, path.extname(file.originalname)),
      extension: path.extname(file.originalname).slice(1),
      mimeType: file.mimetype,
      size: file.size,
      path: file.path
    });

    res.json({ message: 'File uploaded', file: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get files + pagination
export const listFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.list_size) || 10;

    const { count, rows } = await File.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['uploadDate', 'DESC']]
    });

    res.json({ total: count, page, pageSize: size, files: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get file info
export const getFileInfo = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// downloadFile
export const downloadFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    res.download(file.path, `${file.name}.${file.extension}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    await file.destroy();

    res.json({ message: 'File deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update
export const updateFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    const newFile = req.file;
    if (!newFile) return res.status(400).json({ message: 'File required' });

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    file.name = path.basename(newFile.originalname, path.extname(newFile.originalname));
    file.extension = path.extname(newFile.originalname).slice(1);
    file.mimeType = newFile.mimetype;
    file.size = newFile.size;
    file.path = newFile.path;
    file.uploadDate = new Date();

    await file.save();
    res.json({ message: 'File updated', file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
