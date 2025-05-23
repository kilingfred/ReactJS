import { createContext, useContext, useState, ReactNode } from "react";

export interface ResultValue {
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