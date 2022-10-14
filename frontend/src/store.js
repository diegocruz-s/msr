import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice'
import publiReduer from './slices/publiSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        publi: publiReduer,
    }
})

export default store;