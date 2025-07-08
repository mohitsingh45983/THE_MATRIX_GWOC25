import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  cartLength: 0,
  wishListLength: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.cartLength = 0;
      state.wishListLength = 0;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setCartLength: (state, action) => {
      state.cartLength = action.payload;
    },
    updateWishlistCount: (state, action) => {
      state.wishListLength = action.payload;
    },
  },
});

export const { login, logout, setUser, setCartLength, updateWishlistCount } =
  userSlice.actions;
export default userSlice.reducer;
