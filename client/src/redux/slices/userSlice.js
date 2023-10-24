import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  address: "",
  phone: "",
  avatar: "",
  id: "",
  password: "",
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        address = "",
        phone = "",
        password = "",
        avatar = "",
        _id = "",
        access_token = "",
      } = action.payload;

      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.address = address ? address : state.address;
      state.phone = phone ? phone : state.phone;
      state.avatar = avatar ? avatar : state.avatar;
      state.id = _id ? _id : state.id;
      state.password = password;
      state.access_token = access_token ? access_token : state.access_token;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.id = "";
      state.password = "";
      state.access_token = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
