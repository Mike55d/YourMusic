import { useEffect, useState, useMemo } from "react";
import NavBar from "../../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getMyAlmbums } from "./lib/slices/myAlbumsSlice";
import { Grid, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardAlbum from "./CardAlbum";

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
  containerTitle: {
    paddingTop: 40,
    textAlign: "center",
    marginBottom: "80px !important",
  },
  yellowText: {
    color: "#d6f379",
  },
});

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
            <CardAlbum album={album} refetchMyAlbums={getMyAlbums} />
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
