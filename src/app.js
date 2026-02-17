/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 *   Author Aliaksandr Ziabko 
 */
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import userRoutes from './routes/user.routes.js';



const app = express();

// Middlewares
app.use(cors({ origin: '*' })); 
app.use(express.json());         
app.use(express.urlencoded({ extended: true }));


app.use('/', authRoutes);
app.use('/file', fileRoutes);
app.use('/user', userRoutes);


app.get('/', (req, res) => {
  res.send('ERP.AERO API working!');
});

export default app;
