import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainMenu() {
    const [difficulty, setDifficulty] = useState("easy");

    const navigate = useNavigate();

    function startGame(difficulty = "easy") {
       navigate(`${difficulty}`);
    }

    return (
        <div className="main-menu">
            <h1>Welcome to the Game "Math Quiz"!</h1>
            <div className="difficulty-selection">
                <h2>Select Difficulty</h2>
                <button onClick={() => startGame("easy")}>Easy</button>
                <button onClick={() => startGame("medium")}>Medium</button>
                <button onClick={() => startGame("hard")}>Hard</button>
            </div>
        </div>
    )
}
