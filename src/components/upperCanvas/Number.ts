import React, { useState } from 'react';
import { useEffect, useRef } from 'react';;

export default class NumberValue {
    algebra: string[] = ["log", "drob", "pow", "norm"]; // Array to store algebraic variables
    result: number = 0; // Initialize result to 0
    value: HTMLParagraphElement = document.createElement("p"); // Create a new paragraph element for the value
    generateAlgebraicVariable(): undefined {
        let algebra: string = this.algebra[Math.floor(Math.random() * this.algebra.length)];
        let num1: number = Math.floor(Math.random() * 10) + 1;
        let num2: number = Math.floor(Math.random() * 10) + 1;

        switch (algebra) {
            case "log":
                this.result = Math.log(num1);
                this.value.innerHTML = this.generateLogarithmVariable(num1);
                break;
            case "drob":
                this.result = num1 / num2;
                this.value.innerHTML = this.generateFractionVariable(num1, num2);
                break;
            case "pow":
                this.result = Math.pow(num1, num2);
                this.value.innerHTML = this.generatePowerVariable(num1, num2);
                break;
            default:
                this.result = num1;
                this.value.innerHTML = this.result.toString();
        }
    }

    generatePowerVariable(num1: number, num2: number): string {
        return num1 + "^" + num2; // Generates a random number between 1 and 10
    }
    
    generateLogarithmVariable(num1: number): string {
        return `Log<sup style="font-size: 0.7em;display: flex;justify-content:flex-end;flex-direction: column;">e</sup>(${num1})`;
    }

    generateFractionVariable(num1: number, num2: number): string {
        return `
        <div class="fraction">
            <div class="numerator">${num1}</div>
            <div class="denominator">${num2}</div>
        </div>
    `;
    }

    generateRandomNumber(difficulty: string = "easy") : number {
        switch (difficulty) {
            case "medium": this.generateAlgebraicVariable();break;
            case "hard": this.generateAlgebraicVariable();break;
            default: this.result = Math.floor(Math.random() * 10) + 1;this.value.innerHTML = this.result.toString(); // Generates a random number between 1 and 10
        }
        return this.result !== undefined ? this.result : 0;
    }
}