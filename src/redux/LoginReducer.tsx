import {createReducer} from '@reduxjs/toolkit'
import LoginActionCreater from './LoginActionCreater'

const LoginReducer = createReducer(null , (builder) => {
    builder
        .addCase(LoginActionCreater.setToken, (state, action) => {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("userName", action.payload.userName);
        })
        .addCase(LoginActionCreater.deleteToken, (state, action) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userName");
        })
        .addDefaultCase((state, action) => state);
});

export default LoginReducer;