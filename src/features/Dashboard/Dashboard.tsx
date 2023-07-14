import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import NavBar from "../../components/navbar";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState, useMemo } from "react";
import { searchArtists } from "./lib/slices/artistsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import CardArtist from "./CardArtist";

const useStyles = makeStyles({
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
  yellowText: {
    color: "#d6f379",
  },
  containerTitle: {
    paddingTop: 80,
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    "@media (min-width: 900px)": {
      marginTop: 30,
      marginBottom: 60,
    },
    "@media (max-width: 899px)": {
      marginTop: 15,
      marginBottom: 15,
    },
  },
  inputSearch: {
    "@media (max-width: 780px)": {
      width: "95%",
    },

    backgroundColor: "#F5F5F5",
    width: "60%",
    borderRadius: 40,
    "& div": {
      borderRadius: 20,
    },
    "& fieldset": {
      border: "none !important",
    },
  },
  buttonSearch: {
    "& span": {
      textTransform: "initial !important",
      fontFamily: "Montserrat !important",
      fontWeight: 700,
      color: "black",
      "@media (max-width: 550px)": {
        fontSize: 12,
      },
    },
    lineHeight: "2.2 !important",
    width: 120,
    borderRadius: "30px !important",
    backgroundColor: "#d6f379 !important",
    "@media (max-width: 550px)": {
      width: 80,
    },
  },
  container: {
    paddingLeft: 200,
    paddingRight: 200,
    paddingBottom: 80,
    "@media (min-width: 1000px) and (max-width: 1300px)": {
      paddingLeft: 60,
      paddingRight: 60,
    },
    "@media (max-width: 999px)": {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },

  pagination: {
    "& button , .MuiPaginationItem-root": {
      color: "white",
    },
  },
  containerSearch: {
    "@media (max-width: 999px)": {
      marginTop: "40px !important",
    },
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const artists = useSelector((state: RootState) => state.artists);
  const [page, setPage] = useState(1);
  const limit = 4;

  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const refreshSearch = () => {
    dispatch(
      searchArtists({
        artistName: search,
        limit,
        offset,
      })
    );
  };

  const handleClickSearch = () => {
    if (page == 1) {
      refreshSearch();
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    if (search) {
      refreshSearch();
    }
  }, [page]);

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <Grid container>
          <Grid item md={12} sm={12} xs={12} className={classes.containerTitle}>
            <span className={classes.title}>Busca tus</span>
            <span className={`${classes.yellowText} ${classes.title}`}>
              artistas
            </span>
            <p className={classes.subtitle}>
              Encuentra tus artistas favoritos gracias a nuestro <br /> buscador
              y guarda tus álbumes favoritos
            </p>
          </Grid>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            display="flex"
            justifyContent="center"
            className={classes.containerSearch}
          >
            <FormControl className={classes.inputSearch} variant="outlined">
              <OutlinedInput
                placeholder="Buscar artista"
                id="search"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      onClick={handleClickSearch}
                      className={classes.buttonSearch}
                    >
                      <span>Search</span>
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          {artists.artists.length ? (
            <>
              <Grid item md={12} sm={12} xs={12} marginTop={5}>
                <p className={classes.subtitle}>
                  Mostrando {limit} resultados de {artists.total}
                </p>
              </Grid>
              <Grid container marginBottom={1}>
                {artists.artists.map((artist) => (
                  <CardArtist artist={artist} />
                ))}
              </Grid>
              <Pagination
                className={classes.pagination}
                count={Math.floor(artists.total / limit)}
                onChange={handleChangePage}
                page={page}
              />
            </>
          ) : null}
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
