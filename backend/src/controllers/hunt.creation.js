// controllers/hunt.creation.js
import Hunt from '../models/hunts.model.js';

export const createHunt = async (req, res) => {
    try {
        const { name, title, description, image, difficulty, locations, clues } = req.body;
        console.log("Request Body:", req.body);

        const hunt = new Hunt({
            name,
            title,
            description,
            image,
            difficulty,
            locations,
            clues,
            creator: req.user.id 
        });

        await hunt.save();
        res.status(201).json({ message: "Hunt created successfully", hunt });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
