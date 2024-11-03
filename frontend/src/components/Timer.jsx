import React, { useEffect, useState } from "react";

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    let startTime = localStorage.getItem("timerStartTime");
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem("timerStartTime", startTime);
    }

    const calculateTime = () => {
      const start = parseInt(startTime, 10);
      const now = Date.now();
      const diffInSeconds = Math.floor((now - start) / 1000);

      const minutes = Math.floor(diffInSeconds / 60);
      const seconds = diffInSeconds % 60;

      setElapsedTime({ minutes, seconds });
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">
        {elapsedTime.minutes}:
        {elapsedTime.seconds < 10
          ? `0${elapsedTime.seconds}`
          : elapsedTime.seconds}
      </h1>
    </div>
  );
};

export default Timer;
