import {createReducer} from '@reduxjs/toolkit'
import LoginActionCreater from './LoginActionCreater'

export type LoginStateType = {
    authenticated: boolean;
    accessToken: string|null;
    userName: string|null;
};

const initialState: LoginStateType = {
    authenticated: false,
    accessToken: null,
    userName: null,
};

const LoginReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LoginActionCreater.setToken, (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload.accessToken;
            state.userName = action.payload.userName;
        })
        .addCase(LoginActionCreater.deleteToken, (state, action) => {
            state.authenticated = false;
            state.accessToken = null;
            state.userName = null;
        })
        .addDefaultCase((state, action) => state);
});

export default LoginReducer;