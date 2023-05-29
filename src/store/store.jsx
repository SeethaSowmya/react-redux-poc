import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import logSlice from './Slices/logCheckSlice';

const persistConfig ={
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    users:userSlice,
    log:logSlice,

})
const persitedreducer =  persistReducer(persistConfig,reducer)
const store =  configureStore({
    reducer:persitedreducer
})

export default store