export default class Result {
    numbers: number[] = []; // Array to store numbers
    operators: string[] = []; // Array to store operators
    result: string = "?"; // Initialize result to 0
    res = 0;
    
    constructor(numbers: number[], operators: string[]) {
        this.numbers = numbers;
        this.operators = operators;
        this.res = this.numbers[0]; // Initialize result with the first number
        this.count(); // Calculate the result based on the numbers and operators
    }

    
    buildEquation() {
        let equation = this.numbers[0].toString(); // Start with the first number
        for (let i = 0; i < this.operators.length; i++) {
            equation += " " + this.operators[i] + " " + this.numbers[i + 1].toString(); // Append operator and next number
        }
        return equation += " = ?"; // Append equals sign and question mark
    }

    count() {
        for(let i = 0; i < this.operators.length; i++) {
            if (this.operators[i] == "+") {
                this.res += this.numbers[i + 1];
                continue;
            }
            else if (this.operators[i] == "-") {
                this.res -= this.numbers[i + 1];
                continue;
            }
            else if (this.operators[i] == "*") {
                this.res *= this.numbers[i + 1];
                continue;
            }
            else if (this.operators[i] == "/") {
                this.res /= this.numbers[i + 1];
                continue;
            }
        }
        console.log(this.res); // Log the result for debugging
    }
    getResult() {
        return this.res;
    }

}