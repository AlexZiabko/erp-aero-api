/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import jwt from 'jsonwebtoken';


export const generateAccessToken = (user, refreshTokenId) =>
  jwt.sign( { id: user.id, tokenId: refreshTokenId }, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRE) });

export const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: Number(process.env.REFRESH_EXPIRE) });

export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);
