/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true, 
    allowNull: false,
    unique: true,
    validate: {
      isValidId(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          throw new Error('id must be a valid email or phone number');
        }
      }
    }
  },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  timestamps: true,
  tableName: 'Users'
});
