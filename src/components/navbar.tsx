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

const useStyles = makeStyles({
  divider: {
    backgroundColor: "white",
    marginTop: "18px !important",
    marginBottom: "18px !important",
    marginLeft: "25px !important",
    marginRight: "25px !important",
  },
  button: {
    "& span": {
      textTransform: "initial !important",
      fontFamily: "Montserrat !important",
      fontWeight: 400,
    },
  },
  iconSun: {
    color: "white",
  },
  activeLink: {
    color: "#d6f379 !important",
  },
});

const NavBar = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#222222" }}>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>YOUR MUSIC</Typography>
            <Button
              color="inherit"
              className={`${classes.button} ${classes.activeLink}`}
            >
              <span>Buscar</span>
            </Button>
            <Button color="inherit" className={classes.button}>
              {" "}
              <span>Mis albumes</span>
            </Button>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className={classes.divider}
            />
            <Button color="inherit" className={classes.button}>
              {" "}
              <span>Cerrar sesión</span>
            </Button>
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
