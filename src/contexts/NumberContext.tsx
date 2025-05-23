import { createContext, useContext, useState, ReactNode } from "react";
import Logarithm from "../components/Logarithm";
import Drob from "../components/Drob";
import Pow from "../components/Pow";

export interface NumberValue {
    algebra: string[]; // Array to store algebraic variables
    result: number; // Result of the generated number
    value: HTMLElement; // HTML element to display the value
    generateAlgebraicVariable(): { value: number, display: ReactNode }; // Method to generate algebraic variable
    generatePowerVariable(num1: number, num2: number): ReactNode; // Method to generate power variable
    generateLogarithmVariable(num1: number): ReactNode; // Method to generate logarithm variable
    generateFractionVariable(num1: number, num2: number): ReactNode; // Method to generate fraction variable
    generateRandomNumber(difficulty?: string): { value: number, display: ReactNode };
}

const NumberValueContext = createContext<NumberValue | null>(null); // Create a context for NumberValue

interface NumberValueProviderProps {
    children: ReactNode; // Children components to be wrapped by the provider
}

export function NumberValueProvider ({ children }: NumberValueProviderProps) {
    const algebra = ["log", "drob", "pow", "norm"];
    const [result, setResult] = useState<number>(0); // State to store the result
    const value = document.createElement("p");

    const generateAlgebraicVariable = (): { value: number, display: ReactNode } => {
        const algebraType = algebra[Math.floor(Math.random() * algebra.length)];
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let valueNode;
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

    const generatePowerVariable = (num1: number, num2: number): ReactNode => {
        return <Pow base={num1} exponent={num2} />;
    };

    const generateLogarithmVariable = (num1: number): ReactNode => {
        return <Logarithm base={num1}/>;
    };

    const generateFractionVariable = (num1: number, num2: number): ReactNode => {
        return <Drob numerator={num1} denominator={num2} />;
    };

    const generateRandomNumber = (difficulty: string = "easy"): { value: number, display: ReactNode } => {
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