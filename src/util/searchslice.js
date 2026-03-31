import { createSlice } from "@reduxjs/toolkit";

const searchslice=createSlice({
    name:'search',
    initialState:{

    },
    reducers:{
        addcache:(state,action)=>{
            Object.assign(state,action.payload);
        }
    }
})
export const {addcache} = searchslice.actions
export default searchslice.reducer