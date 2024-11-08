import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";

const HuntDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // for navigation
  const [hunt, setHunt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
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
    return () => {
      localStorage.removeItem("isCurrentlyRunning");
    };
  }, [id]);

  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        navigate("/awards"); // redirect to Awards component
      }, 1500);
    }
  }, [completed, navigate]);

  const handleAnswerSubmit = () => {
    const currentLocation = hunt.locations[currentLocationIndex];
    const currentClue = currentLocation.clues[currentClueIndex];

    if (
      userAnswer.toLowerCase().trim() ===
      currentClue.answer.toLowerCase().trim()
    ) {
      setFeedback({
        type: "success",
        message: "Correct! Moving to next clue...",
      });

      if (currentClueIndex + 1 < currentLocation.clues.length) {
        setTimeout(() => {
          setCurrentClueIndex((prev) => prev + 1);
          setUserAnswer("");
          setFeedback(null);
        }, 1500);
      } else if (currentLocationIndex + 1 < hunt.locations.length) {
        setTimeout(() => {
          setCurrentLocationIndex((prev) => prev + 1);
          setCurrentClueIndex(0);
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

  const currentLocation = hunt.locations[currentLocationIndex];
  const currentClue = currentLocation.clues[currentClueIndex];

  return (
    <div className="hunt-container flex flex-col">
      <Timer />
      <div className="hunt-card">
        <h1>{hunt.name}</h1>

        <div className="image-container">
          <img src={hunt.image} alt={hunt.name} />
        </div>

        {!completed ? (
          <div className="hunt-content">
            <div className="clue-section">
              <h2>LOCATION: {currentLocation.name}</h2>
              <p className="clue-text">Clue: {currentClue.text}</p>
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
                    ((currentLocationIndex * currentLocation.clues.length +
                      currentClueIndex +
                      1) /
                      (hunt.locations.length * currentLocation.clues.length)) *
                    100
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

        .location-section {
          margin-bottom: 30px;
        }

        .clue-section {
          background: #f7fafc;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        h2 {
          color: #4a5568;
          font-size: 1.5em;
          margin-bottom: 10px;
        }

        .clue-text {
          font-size: 1.2em;
          color: #2d3748;
          margin-bottom: 15px;
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
        }

        button {
          background: #4299e1;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
        }

        .feedback {
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }

        .feedback.success {
          background: #c6f6d5;
          color: #276749;
        }

        .feedback.error {
          background: #fed7d7;
          color: #9b2c2c;
        }

        .completion-message {
          text-align: center;
          padding: 40px 20px;
        }
      `}</style>
    </div>
  );
};

export default HuntDetails;
