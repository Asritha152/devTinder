import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:'user',
    initialState:{
        value:null
    },
    reducers:{
        setuser:(state,action)=>{
            console.log(action.payload,"This is payload guays");
            
            state.value=action.payload;
        }    }

})
export const {setuser}=userSlice.actions;
export default userSlice.reducer;