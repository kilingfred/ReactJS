import { useState, useEffect } from "react";

export default function useTimer(initialTime: number, isGameOver: boolean) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (isGameOver) return; // Stop the timer if the game is over

    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isGameOver]); // Re-run effect when isGameOver changes

  return time;
}
