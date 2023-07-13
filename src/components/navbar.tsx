import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useDispatch } from "react-redux";
import { logOut } from "../features/Login/lib/slices/loginSlice";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles({
  divider: {
    backgroundColor: "white",
    marginTop: "18px !important",
    marginBottom: "18px !important",
    marginLeft: "25px !important",
    marginRight: "25px !important",
    "@media (max-width: 550px)": {
      marginLeft: "5px !important",
      marginRight: "5px !important",
    },
  },
  button: {
    "& span": {
      textTransform: "initial !important",
      fontFamily: "Montserrat !important",
      fontWeight: 400,
      "@media (max-width: 550px)": {
        fontSize: 9,
      },
    },
  },
  iconSun: {
    color: "white",
    "@media (max-width: 550px)": {
      fontSize: "16px !important",
    },
  },
  activeLink: {
    color: "#d6f379 !important",
  },
  nameApp: {
    fontWeight: "700 !important",
    "@media (max-width: 550px)": {
      fontSize: "10px !important",
    },
  },
  iconLogout: {
    color: "white",
    display: "none !important",
    "@media (max-width: 550px)": {
      display: "inline-block !important",
      fontSize: "16px !important",
    },
  },
  logout: {
    "@media (max-width: 550px)": {
      display: "none !important",
    },
  },
});

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickCerrarSesion = () => {
    dispatch(logOut());
    localStorage.removeItem("auth");
    navigate("/");
  };

  console.log();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#222222" }}>
          <Toolbar>
            <Typography className={classes.nameApp} sx={{ flexGrow: 1 }}>
              YOUR MUSIC
            </Typography>
            <Button
              color="inherit"
              className={`${classes.button} ${
                location.pathname == "/home" ? classes.activeLink : ""
              }`}
              onClick={() => navigate("/home")}
            >
              <span>Buscar</span>
            </Button>
            <Button
              onClick={() => navigate("/myAlbums")}
              color="inherit"
              className={`${classes.button} ${
                location.pathname == "/myAlbums" ? classes.activeLink : ""
              }`}
            >
              <span>Mis albumes</span>
            </Button>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className={classes.divider}
            />
            <Button
              onClick={handleClickCerrarSesion}
              color="inherit"
              className={`${classes.button} ${classes.logout}`}
            >
              <span>Cerrar sesión</span>
            </Button>
            <IconButton
              aria-label="dark-mode"
              onClick={handleClickCerrarSesion}
            >
              <LogoutIcon className={classes.iconLogout} />
            </IconButton>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className={classes.divider}
            />
            <IconButton aria-label="dark-mode">
              <WbSunnyIcon className={classes.iconSun} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
