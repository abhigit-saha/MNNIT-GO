// controllers/getUserHunts.js
import Hunt from '../models/hunts.model.js';

export const getUserHunts = async (req, res) => {
    try {
        const hunts = await Hunt.find({ creator: req.user.id });
        res.status(200).json({ hunts });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
