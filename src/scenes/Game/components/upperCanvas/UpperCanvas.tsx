import { useEffect, useState } from "react";
import useTimer from "./useTimer";
import LowerCanvas from "../lowerCanvas/LowerCanvas";
import { useNumberValue, useTaskValue, useResultValue } from "../../../../Context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

interface UpperCanvasProps {
    difficulty: string;
}

export default function UpperCanvas({ difficulty = "easy" }: UpperCanvasProps) {
    const dispatch = useDispatch();
    const { generateRandomNumber} = useNumberValue(); // Access NumberValue context
    const { currentTask, maxTasks, taskDone } = useTaskValue(); // Access TaskValue context
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [equationJSX, setEquationJSX] = useState<React.ReactNode>(null);
    const [correct, setCorrect] = useState(0); // Use state for correct answers
    const [isGameOver, setIsGameOver] = useState(false);
    const [answer, setAnswer] = useState<number | null>(null); // Updated type to allow null
    const [numberDisplays, setNumberDisplays] = useState<React.ReactNode[]>([]);
    const timer = useTimer(300, isGameOver); // Pass isGameOver to stop the timer
    const { setOperators, setNumbers, getResult, numbers, operators } = useResultValue(); // Access ResultValue context
    const operatorsConstants = ['+', '-', '*', '/'];
    const navigate = useNavigate();

    const generateValue = () => {
        const randomValue = Math.floor(Math.random() * operatorsConstants.length); // Generates a random number between 1 and 4
        return operatorsConstants[randomValue];
    }
    const generateEquation = () => {
        const numberDisplays: React.ReactNode[] = [];
        const newNumbers: number[] = [];
        const newOperators: string[] = [];
        for (let i = 0; i < 2; i++) {
            const { value: numValue, display } = generateRandomNumber(difficulty);
            newNumbers.push(numValue);
            numberDisplays.push(display);
        }
        newOperators.push(generateValue());
        setNumbers(newNumbers);
        setOperators(newOperators);
        setNumberDisplays(numberDisplays); // after you fill numberDisplays[]
        setEquationJSX(generateEquationJSX(numberDisplays, newOperators, null));
        setSelectedOption(null);
        setAnswer(null);
    };

    const generateEquationJSX = (numbersDisplay: React.ReactNode[], operators: string[], answer: number | null) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {numbersDisplay[0]}
            <span style={{ margin: "0 10px", fontSize: "1.5em" }}>{operators[0]}</span>
            {numbersDisplay[1]}
            <span style={{ margin: "0 10px", fontSize: "1.5em" }}>=</span>
            <span style={{ marginLeft: 10 }}>
                {answer !== null ? Number(answer).toFixed(2) : "?"}
            </span>
        </div>
    );

    // Update the equation whenever the answer changes
    useEffect(() => {
        setEquationJSX((prevEquation) => {
            // Replace the prevanswer in the equation with the selected answer
            return generateEquationJSX(numbers.map(num => num.toString()), operators, answer);
        });
    }, [answer]);

    useEffect(() => {
        setEquationJSX(generateEquationJSX(numberDisplays, operators, answer));
        // eslint-disable-next-line
    }, [answer]);

    const handleGuess = () => {
        if (isGameOver) return; // Prevent further updates if the game is over

        if (selectedOption === getResult()) {
            showCorrect(); // Show correct answer feedback
            setCorrect((prevCorrect) => prevCorrect + 1); // Increment correct answers
            taskDone(); // Mark the task as done
        } else {
            showIncorrect(); // Show incorrect answer feedback
            taskDone(); // Mark the task as done even if incorrect
        }
        if (currentTask >= maxTasks) {
            setIsGameOver(true); // Set game over state
        } else {
            generateEquation();
        }
    };

    // Initialize the first equation
    useEffect(() => {
        generateEquation();
    }, []);

    // Move this logic into a useEffect:
    useEffect(() => {
        if (isGameOver) {
            dispatch({ type: "setCorrectAnswers", payload: correct });
            dispatch({ type: "setTimeLeft", payload: timer });
            navigate(`/results/${difficulty}/`);
        }
    }, [isGameOver, correct, timer, navigate, difficulty, dispatch]);

    const background = document.querySelector(".upperCanvas") as HTMLElement;
    const showCorrect = () => {
        background.style.backgroundColor = "green";
        setTimeout(() => {
            background.style.backgroundColor = ""; // Reset background color after 1 second
        }, 2000);

    }

    const showIncorrect = () => {
        background.style.backgroundColor = "red";
        setTimeout(() => {
            background.style.backgroundColor = ""; // Reset background color after 1 second
        }
        , 2000);
    }

    return (
        <>
            <div className="upperCanvas">
                <div className="objectives">
                    <div className="task">
                        <p>{currentTask} / {maxTasks}</p>
                    </div>
                    <div className="timer">
                        <p>{Math.floor(timer / 60)}:{(timer % 60 < 10 ? "0" : "") + (timer % 60)}</p>
                    </div>
                </div>
                <div className="equation">
                    {equationJSX}
                </div>
            </div>
            {numbers.length === 2 && operators.length === 1 && !isNaN(getResult()) && (
            <LowerCanvas
                result={getResult()}
                onOptionSelect={(selectedAnswer) => {
                    setSelectedOption(selectedAnswer); // Update selectedOption
                    setAnswer(selectedAnswer); // Update answer
                }}
            />
            )}
            <button onClick={handleGuess}>Guess</button>
        </>
    );
}