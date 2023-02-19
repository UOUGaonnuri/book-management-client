import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './LoginReducer'

const AppStore = configureStore({ reducer: LoginReducer});
export default AppStore;