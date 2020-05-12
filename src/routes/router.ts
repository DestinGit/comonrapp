import express from 'express';
import { Request, Response} from 'express';
import { userCr } from '../controllers/userCtrl';

export const router = express.Router();

router.use('/b', userCr.index);