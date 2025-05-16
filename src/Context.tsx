import { createContext, useContext, useState, ReactNode, ReactElement } from "react";
import Logarithm from "./components/Logarithm";
import Drob from "./components/Drob";
import Pow from "./components/Pow";

interface NumberValue {
    algebra: string[]; // Array to store algebraic variables
    result: number; // Result of the generated number
    value: HTMLElement; // HTML element to display the value
    generateAlgebraicVariable(): { value: number, display: React.ReactNode }; // Method to generate algebraic variable
    generatePowerVariable(num1: number, num2: number): React.ReactNode; // Method to generate power variable
    generateLogarithmVariable(num1: number): React.ReactNode; // Method to generate logarithm variable
    generateFractionVariable(num1: number, num2: number): React.ReactNode; // Method to generate fraction variable
    generateRandomNumber(difficulty?: string): { value: number, display: React.ReactNode };
}

const NumberValueContext = createContext<NumberValue | null>(null); // Create a context for NumberValue

interface NumberValueProviderProps {
    children: ReactNode; // Children components to be wrapped by the provider
}

export function NumberValueProvider ({ children }: NumberValueProviderProps) {
    const algebra = ["log", "drob", "pow", "norm"];
    const [result, setResult] = useState<number>(0); // State to store the result
    const value = document.createElement("p");

    const generateAlgebraicVariable = (): { value: number, display: React.ReactNode } => {
        const algebraType = algebra[Math.floor(Math.random() * algebra.length)];
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let valueNode: React.ReactNode;
        let resultValue = 0;

        switch (algebraType) {
            case "log":
                resultValue = Math.log(num1);
                valueNode = <Logarithm base={num1} />;
                break;
            case "drob":
                resultValue = num1 / num2;
                valueNode = <Drob numerator={num1} denominator={num2} />;
                break;
            case "pow":
                num2 = Math.floor(Math.random() * 3) + 1;
                resultValue = Math.pow(num1, num2);
                valueNode = <Pow base={num1} exponent={num2} />;
                break;
            default:
                resultValue = num1;
                valueNode = num1.toString();
        }
        setResult(resultValue);
        return { value: resultValue, display: valueNode };
    };

    const generatePowerVariable = (num1: number, num2: number): React.ReactNode => {
        return <Pow base={num1} exponent={num2} />;
    };

    const generateLogarithmVariable = (num1: number): React.ReactNode => {
        return <Logarithm base={num1}/>;
    };

    const generateFractionVariable = (num1: number, num2: number): React.ReactNode => {
        return <Drob numerator={num1} denominator={num2} />;
    };

    const generateRandomNumber = (difficulty: string = "easy"): { value: number, display: React.ReactNode } => {
        if (difficulty === "medium" || difficulty === "hard") {
            if (Math.random() < 0.25) {
                return generateAlgebraicVariable();
            }
        }
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        setResult(randomNumber);
        return { value: randomNumber, display: randomNumber.toString() };
    };

    return (
        <NumberValueContext.Provider
            value={{
                algebra,
                result,
                value,
                generateAlgebraicVariable,
                generatePowerVariable,
                generateLogarithmVariable,
                generateFractionVariable,
                generateRandomNumber,
            }}
        >
            {children}
        </NumberValueContext.Provider>
    );
};

export const useNumberValue = (): NumberValue => {
    const context = useContext(NumberValueContext);
    if (!context) {
        throw new Error("useNumberValue must be used within a NumberValueProvider");
    }
    return context;
};

interface ResultValue {
    numbers: number[];
    operators: string[];
    setNumbers: (nums: number[]) => void;
    setOperators: (ops: string[]) => void;
    getResult(): number;
}

const ResultValueContext = createContext<ResultValue | null>(null);

interface ResultValueProviderProps { 
    children: ReactNode 
}

export function ResultValueProvider({ children }: ResultValueProviderProps) {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [operators, setOperators] = useState<string[]>([]);
     
    const getResult = (): number => {
        if (numbers.length < 2 || operators.length < 1) return NaN;
        let calculatedResult = numbers[0];
        for (let i = 0; i < operators.length; i++) {
            switch (operators[i]) {
                case "+":
                    calculatedResult += numbers[i + 1];
                    break;
                case "-":
                    calculatedResult -= numbers[i + 1];
                    break;
                case "*":
                    calculatedResult *= numbers[i + 1];
                    break;
                case "/":
                    calculatedResult /= numbers[i + 1];
                    break;
                default:
                    break;
            }
        }
        return calculatedResult;// Return the calculated result
    };

    return (
        <ResultValueContext.Provider
            value={{
                numbers,
                operators,
                setNumbers,
                setOperators,
                getResult,
            }}
        >
            {children}
        </ResultValueContext.Provider>
    );
}

export const useResultValue = (): ResultValue => {
    const context = useContext(ResultValueContext);
    if (!context) {
        throw new Error("useResultValue must be used within a ResultValueProvider");
    }
    return context;
};

interface OptionValue {
    value: number; // Value of the option
    generateRandomOption(exclude: number): OptionValue; // Method to generate a random option excluding a specific value
}

const OptionValueContext = createContext<OptionValue | null>(null);

interface OptionValueProviderProps {
    children: ReactNode; // Children components to be wrapped by the provider
}

export function OptionValueProvider({ children }: OptionValueProviderProps) {
    const [value, setValue] = useState<number>(0);

    const generateRandomOption = (exclude: number): OptionValue => {
        let randomValue;
        do {
            randomValue = Math.floor(Math.random() * ((exclude + 10) - (exclude - 10))) + (exclude - 10);
            if (exclude > 0 && randomValue < 0) randomValue *= -1; // Ensure the random number is positive if exclude is positive
        } while (randomValue === exclude);
        setValue(randomValue); // Update the value state
        return { value: randomValue, generateRandomOption };
    };

    return (
        <OptionValueContext.Provider value={{ value, generateRandomOption }}>
            {children}
        </OptionValueContext.Provider>
    );
}

export const useOptionValue = (): OptionValue => {
    const context = useContext(OptionValueContext);
    if (!context) {
        throw new Error("useOptionValue must be used within an OptionValueProvider");
    }
    return context;
};

interface TaskValue {
    maxTasks: number; // Maximum number of tasks
    currentTask: number; // Current task number
    setCurrentTask(task: number): void; // Method to set the task description
    taskDone(): void; // Method to mark the task as done
    getMaxTasks(): number; // Method to get the maximum number of tasks
    getCurrentTask(): number; // Method to get the current task number
}

const TaskValueContext = createContext<TaskValue | null>(null);

interface TaskValueProviderProps {
    children: ReactNode; // Children components to be wrapped by the provider
}

export function TaskValueProvider ({ children }: TaskValueProviderProps) {
    const [maxTasks, setMaxTasks] = useState<number>(5); // Initialize maxTasks to 5
    const [currentTask, setCurrentTask] = useState<number>(1); // Initialize currentTask to 1

    const taskDone = (): void => {
        setCurrentTask(currentTask + 1); // Increment the current task number
    };

    return (
        <TaskValueContext.Provider value={{ 
            maxTasks,
            currentTask, 
            taskDone, 
            setCurrentTask, 
            getMaxTasks: () => maxTasks, 
            getCurrentTask: () => currentTask }}>
            {children}
        </TaskValueContext.Provider>
    );
}

export const useTaskValue = (): TaskValue => {
    const context = useContext(TaskValueContext);
    if (!context) {
        throw new Error("useTaskValue must be used within a TaskValueProvider");
    }
    return context;
}

interface ContextProps {
    numberValue: NumberValue; // Number value context
    resultValue: ResultValue; // Result value context
    optionValue: OptionValue; // Option value context
    taskValue: TaskValue; // Task value context
}

export const useAppContext = (): ContextProps => {
    const numberValue = useNumberValue(); // Get number value context
    const resultValue = useResultValue(); // Get result value context
    const optionValue = useOptionValue(); // Get option value context
    const taskValue = useContext(TaskValueContext); // Get task value context

    if (!taskValue) {
        throw new Error("useAppContext must be used within a TaskValueProvider");
    }

    return { numberValue, resultValue, optionValue, taskValue }; // Return all contexts
};

export default { NumberValueProvider, ResultValueProvider, OptionValueProvider, TaskValueProvider };
