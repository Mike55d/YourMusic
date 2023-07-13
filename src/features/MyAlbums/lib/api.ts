import axios from "axios";

export const getMyAlbums = async (
  limit: number,
  offset: number,
  token: string
) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/me/albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      offset,
    },
  });
  const albums = data.items.map((album: any) => ({
    id: album.album.id,
    name: album.album.name,
    date: album.album.release_date,
    imageUrl: album.album.images[0]?.url,
  }));
  return { albums, total: data.total };
};

export const addFavoriteAlbum = async (id: string, token: string) => {
  const { data } = await axios.put(
    `https://api.spotify.com/v1/me/albums`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ids: id,
      },
    }
  );

  return { data };
};

export const removeFavoriteAlbum = async (id: string, token: string) => {
  const { data } = await axios.delete(`https://api.spotify.com/v1/me/albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ids: id,
    },
  });

  return { data };
};
