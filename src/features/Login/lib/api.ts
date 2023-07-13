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
  localStorage.setItem("auth", JSON.stringify(data));
  return data;
};

export const refreshToken = async (refresh_token: string) => {
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    queryString.stringify({
      refresh_token: refresh_token,
      redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_ROUTE,
      grant_type: "refresh_token",
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
  localStorage.setItem("auth", JSON.stringify(data));
  return data;
};
