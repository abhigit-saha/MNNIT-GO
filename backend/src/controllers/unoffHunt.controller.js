import UnoffHunt from "../models/unoffHunts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllHunts = asyncHandler(async (req, res) => {
  const hunts = await UnoffHunt.find({ roomId: req.params.roomId });
  res.status(200).json(hunts);
});

export const getHuntById = asyncHandler(async (req, res) => {
  const hunt = await UnoffHunt.findById(req.params.id);

  if (!hunt) {
    return res.status(404).json({ message: "Hunt not found" });
  }

  res.status(200).json(hunt);
});

export const verifyAnswer = asyncHandler(async (req, res) => {
  const { answer, clueIndex } = req.body;
  const hunt = await UnoffHunt.findById(req.params.id);

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

  res.status(200).json({
    correct: false,
    message: "Incorrect answer, try again!",
  });
});

export const submitHunt = asyncHandler(async (req, res) => {
  const hunt = await UnoffHunt.create(req.body);
  res.status(201).json(hunt);
});
