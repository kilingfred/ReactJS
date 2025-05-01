import React, { useEffect, useState } from 'react';

export default function LowerCanvas({
    result,
    onOptionSelect,
}: {
    result: number;
    onOptionSelect: (option: number) => void;
}) {
    const [options, setOptions] = useState<number[]>([]);

    useEffect(() => {
        // Generate options (1 correct, 3 incorrect)
        const correctOption = result;
        const incorrectOptions = Array.from({ length: 3 }, () =>
            Math.floor(Math.random() * 100)
        ).filter((option) => option !== correctOption);

        setOptions([correctOption, ...incorrectOptions].sort(() => Math.random() - 0.5));
    }, [result]);

    return (
        <div className="lowerCanvas">
            {options.map((option, index) => (
                <button
                    key={index}
                    className="option-button"
                    onClick={() => onOptionSelect(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
