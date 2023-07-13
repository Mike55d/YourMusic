import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signIn, refreshToken as refreshTokenApi } from "../api";

const authStorage: AuthState = JSON.parse(
  localStorage.getItem("auth") as string
);

export interface AuthState {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  isAuth: boolean;
}

const initialState: AuthState = {
  access_token: "",
  token_type: "",
  refresh_token: "",
  expires_in: 0,
  isAuth: false,
};

export const authUser = createAsyncThunk(
  "user/authUser",
  async (code: string) => {
    try {
      const data = await signIn(code);
      return { ...data, isAuth: true };
    } catch (error) {
      console.log(error);
    }
  }
);

export const refreshToken = createAsyncThunk("user/renewToken", async () => {
  try {
    const data = await refreshTokenApi(authStorage.refresh_token);
    return { ...data, isAuth: true };
  } catch (error) {
    console.log(error);
  }
});

export const AuthSlice = createSlice({
  name: "user",
  initialState: authStorage ?? initialState,
  reducers: {
    AuthUser: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    logOut: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authUser.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        return action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { AuthUser, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
