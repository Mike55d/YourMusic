import axios from "axios";
import { ArtistData } from "./slices/artistsSlice";

const authStorage = JSON.parse(localStorage.getItem("auth") as string);

export const getArtists = async (
  artistName: string,
  limit: number,
  offset: number
) => {
  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${authStorage?.access_token}`,
    },
    params: {
      q: artistName,
      type: "artist",
      limit,
      offset,
    },
  });
  const artists = data.artists.items.map((artist: any) => ({
    name: artist.name,
    image: artist.images[0]?.url,
    followers: artist.followers.total,
  }));
  return { total: data.artists.total, artists };
};
