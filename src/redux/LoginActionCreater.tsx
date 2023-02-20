import { createAction } from '@reduxjs/toolkit'

const LoginActionCreater = {
    setToken: createAction<{userName: string, accessToken: string}>("setToken"),
    deleteToken: createAction<null>("deleteToken")
};

export default LoginActionCreater;