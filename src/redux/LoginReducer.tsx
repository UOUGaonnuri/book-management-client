import {createReducer} from '@reduxjs/toolkit'
import LoginActionCreater from './LoginActionCreater'

export const TOKEN_TIME_OUT = 600*1000;

export type LoginStateType = {
    authenticated: boolean;
    accessToken: string|null;
    expireTime: number|null;
};

const initialState: LoginStateType = {
    authenticated: false,
    accessToken: null,
    expireTime: null
};

const LoginReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LoginActionCreater.setToken, (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload.accessToken;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        })
        .addCase(LoginActionCreater.deleteToken, (state, action) => {
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null;
        })
        .addDefaultCase((state, action) => state);
});

export default LoginReducer;