import {NumberValueProvider, useNumberValue, NumberValue} from "./contexts/NumberContext";
import { ResultValueProvider, useResultValue, ResultValue } from "./contexts/ResultContext";
import { useOptionValue, OptionValueProvider, OptionValue } from "./contexts/OptionContext";
import { TaskValueProvider, TaskValue, useTaskValue } from "./contexts/TaskContext";
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
    const taskValue = useTaskValue(); // Get task value context

    if (!taskValue) {
        throw new Error("useAppContext must be used within a TaskValueProvider");
    }

    return { numberValue, resultValue, optionValue, taskValue }; // Return all contexts
};

export default { NumberValueProvider, ResultValueProvider, OptionValueProvider, TaskValueProvider };
