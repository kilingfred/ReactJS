import React, { useState } from "react";
import UpperCanvas from "../components/upperCanvas/UpperCanvas";
import { createRoot } from "react-dom/client";
export default function MainMenu() {
    const [difficulty, setDifficulty] = useState("easy");

    function startGame(difficulty = "easy") {
        setDifficulty(difficulty);
        const rootElement = document.getElementById("root");
        if (rootElement) {
            const root = createRoot(rootElement);
            root.render(<UpperCanvas difficulty={difficulty} />);
        }
    }

    return (
        <div className="main-menu">
            <h1>Welcome to the Game!</h1>
            <div className="difficulty-selection">
                <h2>Select Difficulty</h2>
                <button onClick={() => startGame("easy")}>Easy</button>
                <button onClick={() => startGame("medium")}>Medium</button>
                <button onClick={() => startGame("hard")}>Hard</button>
            </div>
        </div>
    )
}
