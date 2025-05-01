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

    generateRandomValue() {
        const randomValue = Math.floor(Math.random() * this.result); // Generates a random number between 1 and 100
        this.value = randomValue;
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