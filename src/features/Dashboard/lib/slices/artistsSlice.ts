import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getArtists } from "../api";
import { refreshToken } from "../../../Login/lib/slices/loginSlice";

export type Artist = {
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
      const data = await getArtists(artistName, limit, offset);
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
