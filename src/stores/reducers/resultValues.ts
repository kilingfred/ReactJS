import { Reducer } from "@reduxjs/toolkit";

export interface ResultValuesState {
    correctAnswers: number;
    timeLeft: number;
}
export const initialState: ResultValuesState = {
    correctAnswers: 0,
    timeLeft: 0,
};
export const resultValuesReducer: Reducer<ResultValuesState> = (state = initialState, action) => {
    switch (action.type) {
        case "setCorrectAnswers":
            return { ...state, correctAnswers: Number(action.payload) };
        case "setTimeLeft":
            return { ...state, timeLeft: Number(action.payload) };
        case "reset":
            return initialState;
        default:
            return state;
    }
};
