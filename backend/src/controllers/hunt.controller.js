import Hunt from "../models/hunts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const getAllHunts = async (req, res) => {
  try {
    const hunts = await Hunt.find();
    res.status(200).json(hunts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHuntById = async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id);
    if (!hunt) {
      return res.status(404).json({ message: "Hunt not found" });
    }
    res.status(200).json(hunt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const hunt = await Hunt.findById(req.params.id);

    if (!hunt) {
      return res.status(404).json({ message: "Hunt not found" });
    }

    if (hunt.clues[clueIndex].answer.toLowerCase() === answer.toLowerCase()) {
      hunt.clues[clueIndex].isUnlocked = true;
      await hunt.save();
      return res.status(200).json({
        correct: true,
        message: "Correct answer!",
        nextClue:
          hunt.clues[clueIndex + 1]?.text || "You've completed all clues!",
      });
    }

    res
      .status(200)
      .json({ correct: false, message: "Incorrect answer, try again!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitHunt = asyncHandler(async (req, res) => {
  const hunt = await Hunt.create(req.body);
  res.status(201).json(hunt);
});
