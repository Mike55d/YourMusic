import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { searchArtist } from "./lib/slices/artistSlice";
import { AppDispatch, RootState } from "../../store";
import { Grid, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getMyAlmbums } from "../MyAlbums/lib/slices/myAlbumsSlice";
import CardArtist from "./CardAlbum";

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
  pagination: {
    "& button , .MuiPaginationItem-root": {
      color: "white",
    },
  },
});

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
            <CardArtist album={album} refetchMyAlbums={getMyAlbums} />
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
