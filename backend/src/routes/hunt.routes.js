
import express from 'express';
import { getAllHunts, getHuntById, verifyAnswer } from '../controllers/hunt.controller.js';

const router = express.Router();

router.get('/', getAllHunts);
router.get('/:id', getHuntById);
router.post('/verify-answer', verifyAnswer);

export default router;