import { createSlice } from "@reduxjs/toolkit";
const loginSlice=createSlice({
    name:'login',
    initialState:{
        value:false
    },
    reducers:{
        setisLogggedin:(state,action)=>{
            console.log(action.payload);
            
            state.value=action.payload;
        }

    }
})
export const  {setisLogggedin} =loginSlice.actions;
export default loginSlice.reducer;
