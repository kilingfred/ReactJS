
export default class Operator {
    operators = ['+', '-', '*', '/'];
    
    generateValue() {
        const randomValue = Math.floor(Math.random() * this.operators.length); // Generates a random number between 1 and 4
        return this.operators[randomValue];
    }
}



