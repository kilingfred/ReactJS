import { configureStore } from "@reduxjs/toolkit";
import { resultValuesReducer } from "./reducers/resultValues";
import { loginReducer } from "./reducers/login";
export const store = configureStore({
    reducer: {
        resultValues: resultValuesReducer,
        login: loginReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;