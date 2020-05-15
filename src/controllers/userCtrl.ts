import account from './account/lib';
// import { router } from '../config/routes';
import express from 'express';

export const accountRoutes = express.Router();

accountRoutes.post('/login', account.login);
accountRoutes.post('/signup', account.signup);