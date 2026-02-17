/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const File = sequelize.define('File', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  extension: { type: DataTypes.STRING, allowNull: false },
  mimeType: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.INTEGER, allowNull: false },
  uploadDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  path: { type: DataTypes.STRING, allowNull: false }
});
