import { createAction } from '@reduxjs/toolkit'

const LoginActionCreater = {
    setToken: createAction<{accessToken: string}>("setToken"),
    deleteToken: createAction<null>("deleteToken")
};

export default LoginActionCreater;