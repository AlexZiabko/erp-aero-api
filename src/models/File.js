/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';

export const File = sequelize.define('File', {
  filename: { type: DataTypes.STRING, allowNull: false },
  originalname: { type: DataTypes.STRING, allowNull: false },
  mimetype: { type: DataTypes.STRING },
  size: { type: DataTypes.INTEGER },
  uploadDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

File.belongsTo(User);
User.hasMany(File);
