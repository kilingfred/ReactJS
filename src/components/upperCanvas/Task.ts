import React from 'react';
import { useEffect } from 'react';

export default class Task{
    maxTasks = 5;
    currentTask = 1;

    setCurrentTask = (currentTask: number) => {
        this.currentTask = currentTask;
    };

    constructor() {
        this.maxTasks = 5;
        this.currentTask = 1;
    }

    taskDone() {
        this.setCurrentTask(this.currentTask + 1);

    }  

    getMaxTasks() {
        return this.maxTasks;
    }

    getCurrentTask() {
        return this.currentTask;
    }

    
}