import { useEffect, useState } from "react";

interface LowerCanvasProps {
  result: number;
  onOptionSelect: (option: number) => void;
  difficulty: string;
}

class Option {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  static generateRandomOption(exclude: number): Option {
    let randomValue;
    do {
      randomValue =
        Math.floor(Math.random() * (exclude + 10 - (exclude - 10))) +
        (exclude - 10);
      if (exclude > 0 && randomValue < 0) randomValue *= -1;
    } while (randomValue === exclude);
    return new Option(randomValue);
  }
}

export default function LowerCanvas({
  result,
  onOptionSelect,
  difficulty,
}: LowerCanvasProps) {
  const [options, setOptions] = useState<Option[]>([]);

  // This useEffect creates the options (runs when result/difficulty change)
  useEffect(() => {
    const correctOption = new Option(result);

    let incorrectOptions: Option[] = [];

    switch (difficulty) {
      case "medium":
        incorrectOptions = Array.from({ length: 5 }, () =>
          Option.generateRandomOption(result)
        );
        break;
      case "hard":
        incorrectOptions = Array.from({ length: 5 }, () =>
          Option.generateRandomOption(result)
        );
        break;
      default:
        incorrectOptions = Array.from({ length: 2 }, () =>
          Option.generateRandomOption(result)
        );
    }

    setOptions([correctOption, ...incorrectOptions].sort(() => Math.random() - 0.5));
  }, [result, difficulty]);

  // This useEffect shuffles the options every 1.0s in hard mode only
  useEffect(() => {
    if (difficulty !== "hard") return;

    const interval = setInterval(() => {
      setOptions((prevOptions) => {
        const shuffled = [...prevOptions];
        for (let i = 0; i < shuffled.length - 1; i++) {
          const temp = shuffled[i];
          shuffled[i] = shuffled[i + 1];
          shuffled[i + 1] = temp;
        }
        return [...shuffled];
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up
  }, [difficulty]);

  return (
    <div className="lowerCanvas">
      {options.map((option, index) => (
        <button
          key={index}
          className="option-button"
          onClick={() => onOptionSelect(option.value)}
        >
          {option.value.toFixed(2)}
        </button>
      ))}
    </div>
  );
}
