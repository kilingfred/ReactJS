import React, { useState } from 'react';
import { useEffect, useRef } from 'react';


export default class NumberValue {
    

    generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
        return randomNumber;
    }
}