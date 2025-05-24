import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../stores/store";

export default function ResultScreen() {
  const navigate = useNavigate();
  const { difficulty = "easy" } = useParams();
  const correct = useSelector(
    (state: RootState) => state.resultValues.correctAnswers
  );
  const time = useSelector((state: RootState) => state.resultValues.timeLeft);

  const score = useMemo(() => {
    if (difficulty === "easy") {
      return correct * 100 * (time * 0.1);
    }

    if (difficulty === "medium") {
      return correct * 200 * (time * 0.2);
    }

    return correct * 300 * (time * 0.3);
  }, [difficulty, correct, time]);

  return (
    <div className="result-screen">
      <h1>Result</h1>
      <p>Correct Answers: {correct}</p>
      <p>Time remaining: {time}</p>
      <p>Score: {score.toFixed(0)}</p>
      <button onClick={() => navigate(`/${difficulty}`)}>Play Again</button>
      <button onClick={() => navigate("/")}>Back To Main Menu</button>
    </div>
  );
}
