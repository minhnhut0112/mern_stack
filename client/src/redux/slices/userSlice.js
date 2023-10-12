import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  address: "",
  phone: "",
  avata: "",
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
        avata = "",
        _id = "",
        access_token = "",
      } = action.payload;

      state.name = name;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avata = avata;
      state.id = _id;
      state.password = password;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avata = "";
      state.id = "";
      state.password = "";
      state.access_token = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
