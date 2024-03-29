import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getArtists } from "../api";
import { refreshToken } from "../../../Login/lib/slices/loginSlice";
import { RootState } from "../../../../store";

export type Artist = {
  id:string;
  name: string;
  image: string;
  followers: number;
};

export type ArtistData = {
  total: number;
  artists: Artist[];
};

export type GetArtistsParams = {
  artistName: string;
  limit: number;
  offset: number;
};

const initialState: ArtistData = {
  total: 0,
  artists: [],
};

export const searchArtists = createAsyncThunk(
  "artists/search",
  async ({ artistName, limit, offset }: GetArtistsParams, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const data = await getArtists(
        artistName,
        limit,
        offset,
        state.auth.access_token
      );
      return data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 401) {
        thunkApi.dispatch(refreshToken());
      }
      return { total: 0, artists: [] };
    }
  }
);

export const ArtistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      searchArtists.fulfilled,
      (state, action: PayloadAction<ArtistData>) => {
        return action.payload;
      }
    );
  },
});

export default ArtistsSlice.reducer;
