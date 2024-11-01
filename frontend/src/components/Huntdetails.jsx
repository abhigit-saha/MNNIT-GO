import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";

const HuntDetails = () => {
  const { id } = useParams();
  const [hunt, setHunt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchHuntDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/hunts/${id}`);
        setHunt(response.data);
        if (localStorage.getItem("isCurrentlyRunning") !== "true") {
          localStorage.setItem("timerStartTime", Date.now().toString());
          localStorage.setItem("isCurrentlyRunning", "true");
        }
      } catch (error) {
        console.error("Error fetching hunt details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHuntDetails();
  }, [id]);

  const handleAnswerSubmit = () => {
    const currentClue = hunt.clues[currentClueIndex];
    if (
      userAnswer.toLowerCase().trim() ===
      currentClue.answer.toLowerCase().trim()
    ) {
      setFeedback({
        type: "success",
        message: "Correct! Moving to next clue...",
      });

      if (currentClueIndex + 1 < hunt.clues.length) {
        setTimeout(() => {
          setCurrentClueIndex((prev) => prev + 1);
          setUserAnswer("");
          setFeedback(null);
        }, 1500);
      } else {
        setCompleted(true);
      }
    } else {
      setFeedback({ type: "error", message: "Incorrect answer. Try again!" });
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!hunt) {
    return <div className="not-found">Hunt not found</div>;
  }

  return (
    <div className="hunt-container flex flex-col">
      <Timer />
      <div className="hunt-card">
        <h1>{hunt.name}</h1>

        <div className="image-container">
          <img
            src={hunt.imageUrl || "/api/placeholder/600/400"}
            alt={hunt.name}
          />
        </div>

        {!completed ? (
          <div className="hunt-content">
            <div className="clue-section">
              <h2>
                Clue {currentClueIndex + 1} of {hunt.clues.length}
              </h2>
              <p className="clue-text">{hunt.clues[currentClueIndex].text}</p>
            </div>

            <div className="answer-section">
              <input
                type="text"
                placeholder="Enter your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <button onClick={handleAnswerSubmit}>Submit Answer</button>
            </div>

            {feedback && (
              <div className={`feedback ${feedback.type}`}>
                {feedback.message}
              </div>
            )}

            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${
                    ((currentClueIndex + 1) / hunt.clues.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="completion-message">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You've completed the hunt successfully!</p>
          </div>
        )}
      </div>

      <style>{`
        .hunt-container {
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hunt-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          color: #2d3748;
          margin-bottom: 20px;
          font-size: 2.5em;
        }

        .image-container {
          width: 100%;
          margin-bottom: 30px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .image-container img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
        }

        .clue-section {
          background: #f7fafc;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        h2 {
          color: #4a5568;
          margin-bottom: 10px;
          font-size: 1.5em;
        }

        .clue-text {
          font-size: 1.2em;
          line-height: 1.6;
          color: #2d3748;
        }

        .answer-section {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        input {
          flex: 1;
          padding: 12px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1em;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #4299e1;
        }

        button {
          background: #4299e1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1em;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background: #3182ce;
        }

        .feedback {
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
          font-weight: 500;
        }

        .feedback.success {
          background: #c6f6d5;
          color: #276749;
        }

        .feedback.error {
          background: #fed7d7;
          color: #9b2c2c;
        }

        .progress {
          background: #edf2f7;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 20px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4299e1, #667eea);
          transition: width 0.3s ease;
        }

        .completion-message {
          text-align: center;
          padding: 40px 20px;
        }

        .completion-message h2 {
          color: #2d3748;
          font-size: 2em;
          margin-bottom: 15px;
        }

        .completion-message p {
          color: #4a5568;
          font-size: 1.2em;
        }

        .loading, .not-found {
          text-align: center;
          padding: 40px;
          font-size: 1.5em;
          color: #4a5568;
        }

        @media (max-width: 768px) {
          .hunt-card {
            padding: 20px;
          }

          .image-container img {
            height: 300px;
          }

          .answer-section {
            flex-direction: column;
          }

          button {
            width: 100%;
          }

          h1 {
            font-size: 2em;
          }
        }
      `}</style>
    </div>
  );
};

export default HuntDetails;
