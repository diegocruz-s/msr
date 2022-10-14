import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const dataUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: dataUser ? dataUser : null,
    error: false,
    success: null,
    loading: false,
}

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        const data = await authService.register(user);
        
        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        };  

        return data;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        const data = await authService.login(user);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error)
        }

        return data;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout()
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetStates(state){
            state.error = false;
            state.success = null;
            state.loading = false;
        }
    },
    extraReducers(builder){
        builder
            .addCase(register.pending, (state)=>{
                state.error = null;
                state.loading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.success = null;
                state.user = null;
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.error = null;
                state.success = action.payload.success;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.pending, (state)=>{
                state.error = null;
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.success = null;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.error = null;
                state.success = action.payload.success;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.error = null;
                state.success = null;
                state.user = null;
                state.loading = false;
            })
    }
})

export const {resetStates} = authSlice.actions;
export default authSlice.reducer;