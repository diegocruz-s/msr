import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import publiService from "../services/publiService";

const initialState = {
    loading: false,
    error: false,
    success: null,
    publi: {},
    publis: [],
    countPublis: null
}

export const getAllPublis = createAsyncThunk(
    'publi/allPublis',
    async (limit)=>{
        let data;
        if(limit){
            data = await publiService.getAllPublis(limit);
        }else{
            data = await publiService.getAllPublis();
        }

        return data;
    }
)

export const getPubliByUser = createAsyncThunk(
    'publi/mypublis',
    async (limit, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        let data;
        if(limit){
            data = await publiService.getPubliByUser(limit, token);
        }else{
            data = await publiService.getPubliByUser(null, token);
        }

        return data;
    }
)

export const getPublisUserId = createAsyncThunk(
    'publi/publisUser',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await publiService.getPublisUserId(id, token);

        return data;
    }
)

export const deletePubli = createAsyncThunk(
    'publi/delete',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await publiService.deletePubli(id, token);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error)
        }

        return data;

    }
)

export const createPubli = createAsyncThunk(
    'publi/cretae',
    async(publi, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await publiService.createPubli(publi, token);
        
        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
)

export const countPublisPag = createAsyncThunk(
    'publi/count',
    async (allPublis, thunkAPI)=>{
        const token = thunkAPI.getState().auth.user.token;

        const data = await publiService.countPublis(allPublis, token);
        return data;
    }
)

export const updatedPubli = createAsyncThunk(
    'publi/update',
    async (newPubli, thunkAPI) => {

        const id = newPubli.id;
        delete newPubli.id;
        
        const token = thunkAPI.getState().auth.user.token;

        const data = await publiService.updatedPubli(id, newPubli, token);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
)

export const getPubliId = createAsyncThunk(
    'publi/id',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await publiService.getPubliId(id, token);

        return data;
    }
)

export const publiLike = createAsyncThunk(
    'publi/like',
    async (publiId, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await publiService.publiLike(publiId, token);

        return data;

    }
)

export const commentPubli = createAsyncThunk(
    'publi/comment',
    async (comment, thunkAPI) => {
        const id = comment.id;
        delete comment.id;
        const token = thunkAPI.getState().auth.user.token;
        const data = await publiService.commentPubli(id, comment, token);

        return data;
    }
)

export const publiSlice = createSlice({
    name: 'publi',
    initialState,
    reducers: {
        resetStates(state){
            state.error = false;
            state.loading = false;
            state.success = null;
            state.countPublis = null;
        }
    },
    extraReducers(builder){
        builder
            .addCase(getPubliByUser.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(getPubliByUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.publis = action.payload
            })
            .addCase(deletePubli.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(deletePubli.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.success = null;
            })
            .addCase(deletePubli.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.success = action.payload.success;
                state.publis = state.publis.filter((item) => item._id !== action.payload.publi._id)
            })
            .addCase(createPubli.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(createPubli.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.success = null;
            })
            .addCase(createPubli.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.success = action.payload.success;
                state.publi = action.payload.publi;
                state.publis.unshift(state.publi);
            })
            .addCase(countPublisPag.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(countPublisPag.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.countPublis = action.payload.count
            })
            .addCase(updatedPubli.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(updatedPubli.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
                state.success = null;
            })
            .addCase(updatedPubli.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.success = action.payload.success;
                state.publi = action.payload.publi;
                state.publis.map((publi) => {
                    if(publi._id === state.publi._id){
                        publi.title = state.publi.title
                        publi.description = state.publi.description
                    }
                });
            })
            .addCase(getAllPublis.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(getAllPublis.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.publis = null;
                state.publis = action.payload.posts
            })
            .addCase(getPublisUserId.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(getPublisUserId.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.publis = action.payload
            })
            .addCase(getPubliId.pending, (state)=>{
                state.loading = true;
                state.error = false;
            })
            .addCase(getPubliId.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                state.publi = action.payload.publi;
            })
            .addCase(publiLike.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                if(state.publi.likes){
                    state.publi.likes.push(action.payload.userId);
                }
                state.publis.map(publi => {
                    if(publi._id === action.payload.photoId){
                        return publi.likes.push(action.payload.userId);
                    }

                    return publi
                });
                state.success = action.payload.success
            })
            .addCase(commentPubli.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = false;
                if(state.publi.comments){
                    state.publi.comments.push(action.payload.comment);
                }
                state.publis.map(publi => {
                    if(publi._id === action.payload.photoId){
                        return publi.likes.push(action.payload.comment);
                    }

                    return publi
                });
                state.success = action.payload.success
            })
    }
})

export const { resetStates } = publiSlice.actions;
export default publiSlice.reducer;