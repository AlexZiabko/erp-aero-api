/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import { verifyAccessToken } from '../services/token.service.js';
import { RefreshToken } from '../models/RefreshToken.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccessToken(token);

      const tokenRecord = await RefreshToken.findOne({
      where: { UserId: payload.id, active: true }
    });

    if (!tokenRecord) return res.status(403).json({ message: 'Token revoked' });

    req.userId = payload.id;
    req.currentToken = tokenRecord;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
