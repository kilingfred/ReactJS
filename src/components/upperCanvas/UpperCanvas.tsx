import React, { useState } from 'react';
import Task from './Task';
import useTimer from './useTimer';
import Result from './Result';
import Operator from './Operator';
import NumberValue from './Number';
import LowerCanvas from '../lowerCanvas/LowerCanvas';
import ResultScreen from '../ResultScreen';

export default function UpperCanvas() {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [result, setResult] = useState<number>(0);
    const [task, setTask] = useState(new Task());
    const [equation, setEquation] = useState<string>('');
    const [correct, setCorrect] = useState(0); // Use state for correct answers
    const [isGameOver, setIsGameOver] = useState(false);
    const timer = useTimer(300, isGameOver); // Pass isGameOver to stop the timer


    // Generate a new equation
    const generateEquation = () => {
        const numbers: number[] = [];
        const operators: string[] = [];
        for (let i = 0; i < 2; i++) {
            const number = new NumberValue();
            numbers.push(number.generateRandomNumber());
        }
        const operator = new Operator();
        operators.push(operator.generateValue());

        const resultInstance = new Result(numbers, operators);
        setResult(resultInstance.getResult());
        setEquation(resultInstance.buildEquation());
        setSelectedOption(null); // Reset selected option
    };

    // Handle the "Guess" button click
    const handleGuess = () => {
        if (isGameOver) return; // Prevent further updates if the game is over

        if (selectedOption === result) {
            setCorrect((prevCorrect) => prevCorrect + 1); // Increment correct answers
            alert('Correct!');
            task.taskDone();
        } else {
            alert('Incorrect!');
        }
        if (task.currentTask > task.maxTasks) {
            setIsGameOver(true); // Set game over state
        } else {
            generateEquation();
        }
    };

    // Initialize the first equation
    React.useEffect(() => {
        generateEquation();
    }, []);

    // Render ResultScreen if the game is over
    if (isGameOver) {
        return <ResultScreen correct={correct} difficulty="easy" time={timer} />;
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
                <div className="equation">
                    <p>{equation.replace('?', selectedOption !== null ? selectedOption.toString() : '?')}</p>
                </div>
            </div>
            <LowerCanvas
                result={result}
                onOptionSelect={(option) => setSelectedOption(option)}
            />
            <button onClick={handleGuess}>Guess</button>
        </>
    );
}