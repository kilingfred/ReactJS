import { configureStore } from "@reduxjs/toolkit";
import { resultValuesReducer } from "./reducers/resultValues";
export const store = configureStore({
    reducer: {
        resultValues: resultValuesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;