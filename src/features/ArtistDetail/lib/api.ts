import axios from "axios";

export const getArtist = async (
  artistId: string,
  limit: number,
  offset: number,
  token: string
) => {
  const { data: artist } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data: albums } = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
      },
    }
  );
  const formatAlbums = albums.items.map((album: any) => ({
    id: album.id,
    name: album.name,
    imageUrl: album.images[0]?.url,
    date: album.release_date,
  }));
  return {
    name: artist.name,
    followers: artist.followers.total,
    popularity: artist.popularity,
    albums: formatAlbums,
    imageUrl: artist.images[0]?.url,
    totalAlbums: albums.total,
  };
};
