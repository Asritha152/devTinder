import { createSlice } from "@reduxjs/toolkit";
const FeedSlice=createSlice({
    name:'feed',
    initialState:{
        value:[]
    },
    reducers:{
        setFeed:(state,action)=>{
            state.value=action.payload;
        }
    }
})
export const {setFeed}=FeedSlice.actions;
export default FeedSlice.reducer;