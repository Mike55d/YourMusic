import axios from "axios";
import { Buffer } from "buffer";
import queryString from "query-string";

export const getArtists = async () => {
  const { data } = await axios.get("test", {
    headers: {
      Authorization: "test",
    },
  });
  return data;
};

export const signIn = async (code: string) => {
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    queryString.stringify({
      code: code,
      redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_ROUTE,
      grant_type: "authorization_code",
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.REACT_APP_SPOTIFY_CLIENT_ID +
              ":" +
              process.env.REACT_APP_SPOTIFY_SECRET_ID
          ).toString("base64"),
      },
    }
  );
  return data;
};
