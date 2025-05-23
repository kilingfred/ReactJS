import { createContext, useContext, useState, ReactNode } from "react";
export interface OptionValue {
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