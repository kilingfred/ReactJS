import { useEffect, useState } from 'react';

interface LowerCanvasProps {
    result: number;
    onOptionSelect: (option: number) => void;
}

class Option {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    static generateRandomOption(exclude: number): Option {
        let randomValue;
        do {
            randomValue = Math.floor(Math.random() * ((exclude + 10) - (exclude - 10))) + (exclude - 10);
            if(exclude > 0 && randomValue < 0) randomValue *= -1; // Ensure the random number is positive if exclude is positive
             // Generates a random number between exclude - 10 and exclude + 10
        } while (randomValue === exclude);
        return new Option(randomValue);
    }
}

export default function LowerCanvas({
    result,
    onOptionSelect,
}: LowerCanvasProps) {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        // Generate options (1 correct, 3 incorrect)
        const correctOption = new Option(result); // Create the correct option
        const incorrectOptions = Array.from({ length: 3 }, () =>
            Option.generateRandomOption(result)
        );

        setOptions([correctOption, ...incorrectOptions].sort(() => Math.random() - 0.5));
    }, [result]);

    return (
        <div className="lowerCanvas">
            {options.map((option, index) => (
                <button
                    key={index}
                    className="option-button"
                    onClick={() => {
                        onOptionSelect(option.value); // Pass the value of the Option instance
                    }}
                >
                    {option.value.toFixed(2)} {/* Display the value of the Option instance */}
                </button>
            ))}
        </div>
    );
}
