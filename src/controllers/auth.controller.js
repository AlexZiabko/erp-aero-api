/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/token.service.js';

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) return res.status(400).json({ message: 'id and password required' });

    const existing = await User.findOne({ where: { id } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ id, password: hashed });

    const accessToken = generateAccessToken(user);
    const refreshTokenValue = generateRefreshToken(user);

    await RefreshToken.create({
      token: refreshTokenValue,
      expiryDate: new Date(Date.now() + Number(process.env.REFRESH_EXPIRE) * 1000),
      UserId: user.id,
      active: true
    });

    res.json({ accessToken, refreshToken: refreshTokenValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });

    const accessToken = generateAccessToken(user);
    const refreshTokenValue = generateRefreshToken(user);

    await RefreshToken.create({
      token: refreshTokenValue,
      expiryDate: new Date(Date.now() + Number(process.env.REFRESH_EXPIRE) * 1000),
      UserId: user.id,
      active: true
    });

    res.json({ accessToken, refreshToken: refreshTokenValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

  try {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken); 
    } catch (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const tokenRecord = await RefreshToken.findOne({
      where: { token: refreshToken, active: true, UserId: payload.id }
    });
    if (!tokenRecord) return res.status(403).json({ message: 'Refresh token not found or revoked' });

 
    if (tokenRecord.expiryDate < new Date()) {
      tokenRecord.active = false;
      await tokenRecord.save();
      return res.status(403).json({ message: 'Refresh token expired' });
    }

    const accessToken = generateAccessToken({ id: tokenRecord.UserId });

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGOUT [GET]
export const logout = async (req, res) => {
  try {
    const tokenRecord = req.currentToken; 
    if (tokenRecord) {
      tokenRecord.active = false;
      await tokenRecord.save();
    }
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// INFO
export const info = async (req, res) => {
  res.json({ userId: req.userId });
};
