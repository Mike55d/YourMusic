import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getArtist } from "../api";
import { refreshToken } from "../../../Login/lib/slices/loginSlice";
import { RootState } from "../../../../store";

export type Album = {
  id: string;
  name: string;
  imageUrl: string;
  date: string;
};

export type ArtistData = {
  name: string;
  followers: number;
  popularity: number;
  imageUrl: string;
  totalAlbums: number;
  albums: Album[];
};

export type GetArtistParams = {
  artistId: string;
  limit: number;
  offset: number;
};

const initialState: ArtistData = {
  name: "",
  followers: 0,
  popularity: 0,
  imageUrl: "",
  totalAlbums: 0,
  albums: [],
};

export const searchArtist = createAsyncThunk(
  "artist/get",
  async ({ artistId, limit, offset }: GetArtistParams, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const data = await getArtist(
        artistId,
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
      return initialState;
    }
  }
);

export const ArtistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      searchArtist.fulfilled,
      (state, action: PayloadAction<ArtistData>) => {
        return action.payload;
      }
    );
  },
});

export default ArtistSlice.reducer;
