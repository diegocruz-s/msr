import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: null,
    error: false,
    loading: false,
    success: null
}

export const getUserToken = createAsyncThunk(
    'user/getusertoken',
    async(_,thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.getUserByToken(token);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error)
        }

        return data;

    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (user, thunkAPI) => {
        const token = await thunkAPI.getState().auth.user.token;

        const data = await userService.updateUser(user, token);
        
        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;

    }
)

export const getUserById = createAsyncThunk(
    'user/id',
    async (id, thunkAPI)=>{
        const token = thunkAPI.getState().auth.user.token;
        const data = await userService.getUserById(id, token);

        return data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetStates(state){
            state.error = false;
            state.loading = false;
            state.success = null;
        }
    },
    extraReducers(builder){
        builder
            .addCase(getUserToken.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserToken.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload;
            })
            .addCase(updateUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = action.payload.success;
                state.user = action.payload.user;
            })
            .addCase(getUserById.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload.user;
            })
    }
})

export const { resetStates } = userSlice.actions;
export default userSlice.reducer;