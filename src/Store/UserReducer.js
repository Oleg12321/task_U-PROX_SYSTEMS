import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./UserList";

const UserReducer = createSlice({
  name: 'users',
  initialState: userList.map(user => ({ ...user, status: false })),
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
      console.log(action);
    },
    updateUser: (state, action) => {
      const { id, name, text } = action.payload;
      const userUpdate = state.find(user => user.id === id)
      if (userUpdate) {
        userUpdate.name = name
        userUpdate.text = text;
      }
    },
     removeUser: (state, action) => {
      const { id } = action.payload;
      return state.filter(user => user.id !== id);
    },
    changeStatus: (state, action) => {
     const { id } = action.payload;
     const user = state.find((user) => user.id === id);
     console.log(id);
     if (user) {
       user.status = !user.status;
     }
    }
  }
})

export const { addUser, updateUser, removeUser, changeStatus } = UserReducer.actions;

export default UserReducer.reducer