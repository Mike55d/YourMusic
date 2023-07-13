import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Album } from "../ArtistDetail/lib/slices/artistSlice";
import { AppDispatch, RootState } from "../../store";
import { getMyAlmbums } from "./lib/slices/myAlbumsSlice";
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
import { addFavoriteAlbum, removeFavoriteAlbum } from "./lib/api";

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
  containerTitle: {
    paddingTop: 40,
    textAlign: "center",
    marginBottom:'80px !important'
  },
  yellowText: {
    color: "#d6f379",
  },
});

type CardProps = {
  album: Album;
  refetchMyAlbums: () => void;
};

const CardComponent = ({ album, refetchMyAlbums }: CardProps) => {
  const classes = useStyles();
  const { auth } = useSelector((state: RootState) => state);

  const albumName = useMemo(() => {
    if (album.name.length > 15) {
      return album.name.substring(0, 15) + "...";
    }
    return album.name;
  }, [album]);

  const handleRemoveFavorite = async () => {
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
            <Button
              onClick={handleRemoveFavorite}
              className={`${classes.buttonAddRemove} ${classes.removeAlbum}`}
            >
              <span>+ Remove album</span>
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const MyAlbums = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myalbums } = useSelector((state: RootState) => state);
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const limit = 4;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  const getMyAlbums = () => {
    dispatch(getMyAlmbums({ limit, offset }));
  };

  useEffect(() => {
    getMyAlbums();
  }, [page]);

  return (
    <>
      <NavBar />
      <Grid container className={classes.container}>
        <Grid item md={12} sm={12} xs={12} className={classes.containerTitle}>
          <span className={classes.title}>Mis albumes</span>
          <span className={`${classes.yellowText} ${classes.title}`}>
            guardados
          </span>
          <p className={classes.subtitle} style={{ color: "gray" }}>
            Disfruta de tu música a un solo click y descube que <br /> discos
            has guardado dentro de “mis álbumes”
          </p>
        </Grid>
        <Grid container marginBottom={1}>
          {myalbums.albums.map((album) => (
            <CardComponent album={album} refetchMyAlbums={getMyAlbums} />
          ))}
        </Grid>
        <Pagination
          className={classes.pagination}
          count={Math.ceil(myalbums.total / limit)}
          onChange={handleChangePage}
          page={page}
        />
      </Grid>
    </>
  );
};

export default MyAlbums;
