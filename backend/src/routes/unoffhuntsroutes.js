// routes/hunt.routes.js
import express from 'express';
const router = express.Router();

// Example endpoint for joining a hunt
router.post('/join', (req, res) => {
    const { roomName } = req.body;
    // Logic to add user to the room (if necessary)
    res.status(200).json({ message: 'Joined room', roomName });
});

// Other routes can be defined here

export default router;
