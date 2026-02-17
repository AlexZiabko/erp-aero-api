/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';

export const RefreshToken = sequelize.define('RefreshToken', {
  token: { type: DataTypes.STRING, allowNull: false },
  expiryDate: { type: DataTypes.DATE, allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

RefreshToken.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(RefreshToken, { foreignKey: 'UserId' });

