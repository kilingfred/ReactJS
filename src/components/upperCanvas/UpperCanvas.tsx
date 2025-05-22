import React, { useState, useEffect } from 'react';
import Task from './Task';
import useTimer from './useTimer';
import Result from './Result';
import Operator from './Operator';
import NumberValue from './Number';
import LowerCanvas from '../lowerCanvas/LowerCanvas';
import ResultScreen from '../ResultScreen';

export default function UpperCanvas({ difficulty = "easy" }: { difficulty: string }) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [result, setResult] = useState<number>(0);
    const [task, setTask] = useState(new Task());
    const [equation, setEquation] = useState<string>(''); // Updated type
    const [correct, setCorrect] = useState(0); // Use state for correct answers
    const [isGameOver, setIsGameOver] = useState(false);
    const [answer, setAnswer] = useState<number | null>(null); // Updated type to allow null
    const timer = useTimer(300, isGameOver); // Pass isGameOver to stop the timer

    const generateEquation = () => {
        const numbers: number[] = [];
        const numberValues: string[] = [];
        const operators: string[] = [];
        for (let i = 0; i < 2; i++) {
            const number = new NumberValue();
            numbers.push(number.generateRandomNumber(difficulty));
            numberValues.push(number.value.innerHTML); // Store the generated number value
        }
        const operator = new Operator();
        operators.push(operator.generateValue());

        const resultInstance = new Result(numbers, operators);
        setResult(resultInstance.getResult());
        setEquation(generateEquationString(numberValues, operators, null)); // Generate the equation string
        setSelectedOption(null); // Reset selected option
        setAnswer(null); // Reset answer
    };

    const generateEquationString = (numbersValue: string[], operators: string[], answer: number | null): string => {
        return `
            <div style="display: flex; align-items: center; justify-content: center;">
                ${numbersValue[0]}
                <span style="margin: 0 10px; font-size: 1.5em;">${operators[0]}</span>
                ${numbersValue[1]}
                <span style="margin-left: 10px;">= ${answer !== null ? answer : '?'}</span>
            </div>
        `;
    };

    // Update the equation whenever the answer changes
    useEffect(() => {
        setEquation((prevEquation) => {
            // Replace the "?" in the equation with the selected answer
            if(prevEquation.includes('= ?')) {
                return prevEquation.replace(/= \?/, `= ${answer !== null ? answer.toString() : '?'}`);
            }
            else if(answer !== null) {
               return prevEquation.replace(/= .*/, `= ${answer !== null ? answer.toString() : '?'}`);
            }
            return prevEquation;
        });
    }, [answer]);

    if(timer <= 0) {
        setIsGameOver(true); // Set game over state if time is up
    }
    const handleGuess = () => {
        if (isGameOver) return; // Prevent further updates if the game is over

        if (selectedOption === result) {
            setCorrect((prevCorrect) => prevCorrect + 1); // Increment correct answers
            alert('Correct!');
            task.taskDone();
        } else {
            alert('Incorrect!');
            task.taskDone(); // Mark the task as done even if incorrect
        }
        
        if (task.currentTask > task.maxTasks) {
            setIsGameOver(true); // Set game over state
        } else {
            generateEquation();
        }
    };

    // Initialize the first equation
    useEffect(() => {
        generateEquation();
    }, []);

    // Render ResultScreen if the game is over
    if (isGameOver) {
        return <ResultScreen correct={correct} difficulty={difficulty} time={timer} />;
    }

    return (
        <>
            <div className='upperCanvas'>
                <div className='objectives'>
                    <div className="task">
                        <p>{task.getCurrentTask()} / {task.getMaxTasks()}</p>
                    </div>
                    <div className="timer">
                        <p>{Math.floor(timer / 60)}:{(timer % 60 < 10 ? '0' : '') + (timer % 60)}</p>
                    </div>
                </div>
                <div
                    className="equation"
                    dangerouslySetInnerHTML={{ __html: equation }}>
                </div>
            </div>
            <LowerCanvas
                result={result}
                onOptionSelect={(selectedAnswer) => {
                    setSelectedOption(selectedAnswer); // Update selectedOption
                    setAnswer(selectedAnswer); // Update answer
                }}
            />
            <button onClick={handleGuess}>Guess</button>
        </>
    );
}