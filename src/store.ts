import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Login/lib/slices/loginSlice";
import artistsReducer from "./features/Dashboard/lib/slices/artistsSlice";
import artistReducer from "./features/ArtistDetail/lib/slices/artistSlice";
import myAlbumsReducer from "./features/MyAlbums/lib/slices/myAlbumsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artists: artistsReducer,
    artist: artistReducer,
    myalbums: myAlbumsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
