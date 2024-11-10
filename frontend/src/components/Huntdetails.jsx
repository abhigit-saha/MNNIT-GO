import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";
import { nanoid } from "nanoid";
import { X } from "lucide-react";
import ReadQr from "./ReadQr";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const HuntDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hunt, setHunt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const User = JSON.parse(localStorage.getItem("User"));

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
    async function setLeaderboard() {
      if (completed) {
        const timerStartTime = localStorage.getItem("timerStartTime");

        await axios.post(`http://localhost:8000/leaderboard/${id}/update`, {
          username: User.username,
          score: Math.floor((Date.now() - parseInt(timerStartTime)) / 1000),
        });

        const credential = nanoid();
        const response = await axios.post(
          "http://localhost:8000/credential/create-credential",
          {
            username: JSON.stringify(User.username),
            credential: credential,
          }
        );

        navigate(`/completed/${User.username}/${credential}`);
      }
    }
    setLeaderboard();
  }, [completed]);

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
              {currentClue.isQr && (
                <div className="qr-section">
                  <span className="qr-badge">QR Code Required</span>
                  <button
                    className="qr-scanner-button"
                    onClick={() => setIsQrScannerOpen(true)}
                  >
                    Open QR Scanner
                  </button>
                </div>
              )}
              <p className="clue-text">Question: {currentClue.text}</p>
              <p className="clue-text">Hint: {currentClue.hint}</p>
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

      <Modal isOpen={isQrScannerOpen} onClose={() => setIsQrScannerOpen(false)}>
        <div className="qr-scanner-container">
          <h2>Scan QR Code</h2>
          {/* Your QR Scanner component will go here */}
          <ReadQr />
        </div>
      </Modal>

      <style jsx>{`
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
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
        .qr-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .qr-badge {
          background-color: #805ad5;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .qr-scanner-button {
          background: #805ad5;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .qr-scanner-button:hover {
          background: #6b46c1;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 24px;
          border-radius: 12px;
          position: relative;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #4a5568;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-close:hover {
          background: #f7fafc;
        }
        .qr-scanner-container {
          padding: 20px;
        }
        .qr-scanner-placeholder {
          width: 100%;
          height: 300px;
          background: #f7fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          margin-top: 16px;
          border: 2px dashed #e2e8f0;
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
          border: none;
          cursor: pointer;
        }
        .feedback {
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 15px;
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
        .progress {
          width: 100%;
          height: 8px;
          background: #edf2f7;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 20px;
        }
        .progress-bar {
          height: 100%;
          background: #4299e1;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default HuntDetails;
