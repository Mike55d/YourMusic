import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getMyAlbums } from "../api";
import { refreshToken } from "../../../Login/lib/slices/loginSlice";
import { RootState } from "../../../../store";

export type Album = {
  id: string;
  name: string;
  imageUrl: string;
  date: string;
};

export type MyAlbumsData = {
  total: number;
  albums: Album[];
};

export type GetMyAlbumsParams = {
  limit: number;
  offset: number;
};

const initialState: MyAlbumsData = {
  total: 0,
  albums: [],
};

export const getMyAlmbums = createAsyncThunk(
  "myAlbums/getAlbums",
  async ({ limit, offset }: GetMyAlbumsParams, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const data = await getMyAlbums(limit, offset, state.auth.access_token);
      return data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 401) {
        thunkApi.dispatch(refreshToken());
      }
      return initialState;
    }
  }
);

export const MyAlbumsSlice = createSlice({
  name: "myAlbums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMyAlmbums.fulfilled,
      (state, action: PayloadAction<MyAlbumsData>) => {
        return action.payload;
      }
    );
  },
});

export default MyAlbumsSlice.reducer;
