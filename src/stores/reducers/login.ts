// login.ts
import { createReducer } from "@reduxjs/toolkit";

export interface LoginState {
  isLoggedIn: boolean;
  userName: string;
  password: string;
}

export const initialState: LoginState = {
  isLoggedIn: false,
  userName: "",
  password: "",
};

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("setLogin", (state, action: any) => {
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.password = action.payload.password;
    })
    .addCase("setLogout", (state) => {
      state.isLoggedIn = false;
      state.userName = "";
    })
    .addCase("setPassword", (state, action: any) => {
      state.password = String(action.payload);
    });
});
