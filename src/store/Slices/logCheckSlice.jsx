import {createSlice} from '@reduxjs/toolkit'

const logSlice = createSlice({
    name : 'log',
    initialState:false,
    reducers:{
        logStateUpdate(state,action){
            console.log(action.payload,'log state in log slice')
           return action.payload
        },

    }
})

export default logSlice.reducer;
export const {logStateUpdate} = logSlice.actions;


