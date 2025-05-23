import { createContext, useContext, useState, ReactNode } from "react";
export interface TaskValue {
    maxTasks: number; // Maximum number of tasks
    currentTask: number; // Current task number
    setCurrentTask(task: number): void; // Method to set the task description
    setMaxTasks(task: number): void; // Method to set the maximum number of tasks
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
            setMaxTasks,
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
