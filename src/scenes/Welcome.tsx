import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function MainMenu() {
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.login.userName);
    const password = useSelector((state: RootState) => state.login.password);
    function startGame(difficulty = "easy") {
       navigate(`/game/${difficulty}`);
    }

    return (
        <div className="main-menu">
            <h1>Welcome <b>{username ? username : "Guest"}</b> to the Game "Math Quiz"!</h1>
            <div className="difficulty-selection">
                <h2>Select Difficulty</h2>
                <button onClick={() => startGame("easy")}>Easy</button>
                <button onClick={() => startGame("medium")}>Medium</button>
                <button onClick={() => startGame("hard")}>Hard</button>
            </div>
        </div>
    )
}
