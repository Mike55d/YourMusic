import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Album, searchArtist } from "./lib/slices/artistSlice";
import { AppDispatch, RootState } from "../../store";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addFavoriteAlbum, removeFavoriteAlbum } from "../MyAlbums/lib/api";
import { getMyAlmbums } from "../MyAlbums/lib/slices/myAlbumsSlice";

const useStyles = makeStyles({
  circleImage: {
    width: "20vw",
    height: "20vw",
    "@media (min-width: 550px) and (max-width: 900px)": {
      width: "35vw",
      height: "35vw",
    },
    "@media (max-width: 549px)": {
      width: "55vw",
      height: "55vw",
    },
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginBottom: 15,
    borderRadius: 250,
  },
  container: {
    paddingTop: 50,
    paddingRight: 150,
    paddingLeft: 150,
    paddingBottom: 40,
    "@media (max-width: 900px)": {
      paddingRight: 24,
      paddingLeft: 24,
    },
  },
  title: {
    fontSize: 64,
    marginTop: 0,
    fontWeight: 700,
    display: "block",
    color: "white",
    "@media (max-width: 780px)": {
      fontSize: "10vw",
      display: "inline-block",
      width: "100%",
    },
  },
  subtitle: {
    fontSize: 17,
    color: "white",
  },
  containertopText: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  certifiedIcon: {
    color: "#619ced",
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 20,
    marginLeft: 5,
  },
  card: {
    "& .MuiPaper-elevation": {
      boxShadow: "none",
    },
    "& div": {
      borderRadius: 20,
      backgroundColor: "transparent",
    },
    "& .MuiCardContent-root": {
      color: "white !important",
      padding: 20,
    },
    // "& .MuiCardContent-root:hover": {
    //   backgroundColor: "#d6f379",
    //   color: "black !important",
    // },
  },
  pagination: {
    "& button , .MuiPaginationItem-root": {
      color: "white",
    },
  },
  imageCard: {
    width: "100%",
    height: 220,
    "@media (min-width: 900px) and (max-width: 1300px)": {
      height: 160,
    },
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginBottom: 15,
  },
  buttonAddRemove: {
    "& span": {
      textTransform: "initial !important",
      fontFamily: "Montserrat !important",
      fontWeight: 700,
      color: "black",
      fontSize: "0.8vw",
      "@media (min-width: 601px) and (max-width: 900px) ": {
        fontSize: "1.6vw",
      },
      "@media (max-width: 600px) ": {
        fontSize: "3.5vw",
      },
    },
    lineHeight: "2.2 !important",
    width: "60%",
    borderRadius: "30px !important",
    "@media (min-width: 900px) and (max-width: 1150px)": {
      width: "80%",
    },
    "@media (max-width: 899px) ": {
      width: "90%",
    },
  },
  addAlbum: {
    backgroundColor: "#d6f379 !important",
  },
  removeAlbum: {
    backgroundColor: "#e3513d !important",
  },
});

type CardProps = {
  album: Album;
  refetchMyAlbums: () => void;
};

const CardComponent = ({ album, refetchMyAlbums }: CardProps) => {
  const classes = useStyles();
  const { myalbums, auth } = useSelector((state: RootState) => state);

  const albumName = useMemo(() => {
    if (album.name.length > 15) {
      return album.name.substring(0, 15) + "...";
    }
    return album.name;
  }, [album]);

  const IsAdded = useMemo(() => {
    const exist = myalbums.albums.find((myAlbum) => myAlbum.id == album.id);
    if (exist) {
      return true;
    }
    return false;
  }, [myalbums, album]);

  const handleAddFavorite = async () => {
    await addFavoriteAlbum(album.id, auth.access_token);
    refetchMyAlbums();
  };

  const handleRemoveFavorite = async () => {
    console.log(album.id);
    await removeFavoriteAlbum(album.id, auth.access_token);
    refetchMyAlbums();
  };

  return (
    <>
      <Grid
        item
        md={3}
        sm={6}
        xs={12}
        marginBottom={2}
        className={classes.card}
      >
        <Card>
          <CardContent style={{ minHeight: 300 }}>
            <div
              className={classes.imageCard}
              style={{
                backgroundImage: `url("${album.imageUrl}")`,
                backgroundColor: "black",
              }}
            ></div>
            <div style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Typography
                sx={{ fontSize: 28, lineHeight: 1, fontWeight: 700 }}
                gutterBottom
              >
                {albumName}
              </Typography>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                Publicado: {album.date}
              </Typography>
            </div>
            {IsAdded ? (
              <Button
                onClick={handleRemoveFavorite}
                className={`${classes.buttonAddRemove} ${classes.removeAlbum}`}
              >
                <span>+ Remove album</span>
              </Button>
            ) : (
              <Button
                onClick={handleAddFavorite}
                className={`${classes.buttonAddRemove} ${classes.addAlbum}`}
              >
                <span>+ Add album</span>
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const ArtistDetail = () => {
  let { artistId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { artist } = useSelector((state: RootState) => state);
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const limit = 4;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const searchALbums = () => {
    if (artistId) {
      dispatch(
        searchArtist({
          artistId,
          limit,
          offset,
        })
      );
    }
  };

  const getMyAlbums = () => {
    dispatch(getMyAlmbums({ limit: 50, offset: 0 }));
  };

  useEffect(() => {
    searchALbums();
  }, [page]);

  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  useEffect(() => {
    searchALbums();
    getMyAlbums();
  }, [artistId]);

  return (
    <>
      <NavBar />
      <Grid container className={classes.container}>
        <Grid item md={4} sm={12} xs={12}>
          <div
            className={classes.circleImage}
            style={{
              backgroundImage: `url("${artist.imageUrl}")`,
              backgroundColor: "black",
            }}
          ></div>
        </Grid>
        <Grid item md={8} sm={12} xs={12} marginTop={5}>
          <Grid className={classes.containertopText}>
            <CheckCircleIcon className={classes.certifiedIcon} />
            <span className={classes.subtitle}>Artista certificado</span>
          </Grid>
          <span className={classes.title}>{artist.name}</span>
          <Grid marginTop={5}>
            <span className={classes.subtitle} style={{ display: "block" }}>
              Followers: {artist.followers}
            </span>
            <span
              className={classes.subtitle}
              style={{ display: "block", marginTop: 10 }}
            >
              Oyentes mensuales: {artist.popularity}
            </span>
          </Grid>
        </Grid>
        <Grid marginTop={7} marginBottom={5}>
          <span className={classes.subtitle} style={{ color: "gray" }}>
            Guarda tus álbumes favoritos de {artist.name}
          </span>
        </Grid>
        <Grid container marginBottom={1}>
          {artist.albums.map((album) => (
            <CardComponent album={album} refetchMyAlbums={getMyAlbums} />
          ))}
        </Grid>
        <Pagination
          className={classes.pagination}
          count={Math.floor(artist.totalAlbums / limit)}
          onChange={handleChangePage}
          page={page}
        />
      </Grid>
    </>
  );
};

export default ArtistDetail;
