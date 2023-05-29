import { createSlice } from "@reduxjs/toolkit";

const userSclice = createSlice({
  name: "users",
  initialState: {
    usersData: [],
    viewUserDetails: [],
  },
  reducers: {
    storeUsers(state, action) {
        console.log(state, "ini state");
        //   state ={usersData:action.payload,viewUserDetails:[]};
        state.usersData = action.payload
        return state
    },
    insertViewData(state,action){
        console.log(state, "ini view state");

        state.viewUserDetails = action.payload
        console.log(state, "after view state");

    },
    updateUsers(state, action) {},
    deleteUsers(state, action) {
      console.log(action, "del is");
    //   state.splice(action.payload, 1);
    },
  },
});
console.log(userSclice,"userSclice");
console.log(userSclice.reducer);
export default userSclice.reducer;
export const { storeUsers } = userSclice.actions;
export const { insertViewData } = userSclice.actions;
export const { updateUsers } = userSclice.actions;
export const { deleteUsers } = userSclice.actions;

console.log(userSclice.actions, "userSclice.actions*******");
