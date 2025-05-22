import React from 'react';

export default class Option{
    value = 0;
    result = 0;
    text = "";

    constructor(result: number) {
        this.value = 0;
        this.result = result;
    }

    setValue(value: number) {
        this.value = value;
    }

    generateRandomValue(difficulty: string = "easy") {
        switch (difficulty) {
            case "medium":
                this.value = Math.floor(Math.random() * 50) + 1; // Generates a random number between 1 and 50
                break;
            case "hard":
                this.value = Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
                break;
            default:
                this.value = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
        }
        // Generates a random number between 1 and 100
        this.value = this.result;
    }

    setText(text: string) {
        this.text = text;
    }

    getText() {
        return this.text;
    }
    
    getValue() {
        return this.value;
    }
}