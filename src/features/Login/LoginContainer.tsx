import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { generateRandomString } from "../../utils";
import { authUser } from "./lib/slices/loginSlice";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_ROUTE;

const useStyles = makeStyles({
  imageArrow: {
    height: 450,
    width: "auto",
    "@media (max-width: 780px)": {
      width: "70%",
      height: "auto",
    },
  },
  title: {
    fontSize: 64,
    marginTop: 0,
    fontWeight: 700,
    color: "white",
    "@media (max-width: 780px)": {
      fontSize: "8vw",
      display: "inline-block",
      width: "100%",
    },
  },
  yellowText: {
    color: "#d6f379",
  },
  boxes: {
    "@media (max-width: 780px)": {
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 50,
    },
  },
  subtitle: {
    color: "white",
    "@media (min-width: 900px)": {
      marginTop: 60,
      marginBottom: 60,
    },
  },
  containerButtonLogin: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonLogin: {
    color: "white !important",
    paddingLeft: "0 !important",
    "& div": {
      textTransform: "initial !important",
      fontFamily: "Montserrat !important",
      fontWeight: 700,
    },
  },
  container: {
    "@media (min-width: 780px)": {
      marginTop: 120,
      paddingLeft: 150,
      paddingRight: 150,
    },
    "@media (min-width: 781px) and (max-width: 1400px)": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

const LoginContainer = () => {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");
    if (spotifyCode) {
      dispatch(authUser(spotifyCode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleClick = () => {
    const state = generateRandomString(16);
    const spotifyUrl =
      "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: client_id,
        redirect_uri: redirect_uri,
        state: state,
      });
    window.location.replace(spotifyUrl);
  };

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/home");
    }
  }, [auth.isAuth]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#222222" }}>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>YOUR MUSIC</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container className={classes.container}>
        <Grid
          md={6}
          sm={12}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.boxes}
          item
        >
          <img
            className={classes.imageArrow}
            src="/app-images/arrow-login.png"
            alt="image"
          />
        </Grid>
        <Grid
          md={6}
          sm={12}
          xs={12}
          display="flex"
          justifyContent="center"
          className={classes.boxes}
          item
        >
          <Grid>
            <span className={classes.title}>Disfruta de la</span>
            <br />
            <span className={`${classes.yellowText} ${classes.title}`}>
              mejor música
            </span>
            <p className={classes.subtitle}>
              Accede a tu cuenta para guardar tus albumes favoritos.
            </p>
            <Button className={classes.buttonLogin} onClick={handleClick}>
              <Grid className={classes.containerButtonLogin}>
                Log in con Spotify
                <ArrowForwardIcon />
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginContainer;
