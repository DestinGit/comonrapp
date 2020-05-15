import express from 'express';
import { accountRoutes } from '../controllers/userCtrl';

export const router = express.Router();

router.use('/user', accountRoutes);

// router.use('/b', userCr.index);
// curl -k -X POST 
// -d '{"email":"mopao@vedir.fr","password":"tokoss"}' 
// -H "Content-Type: application/json" http://localhost:4000/user/login