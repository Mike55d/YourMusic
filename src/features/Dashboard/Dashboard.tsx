import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import NavBar from "../../components/navbar";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";

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
    paddingTop: 100,
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
    },
    lineHeight: "2.2 !important",
    width: 120,
    borderRadius: "30px !important",
    backgroundColor: "#d6f379 !important",
  },
  container: {
    paddingLeft: 200,
    paddingRight: 200,
    paddingBottom: 80,
    "@media (max-width: 1300px)": {
      paddingLeft: 60,
      paddingRight: 60,
    },
  },
  "@media (max-width: 780px)": {
    paddingLeft: 10,
    paddingRight: 10,
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
    "& .MuiCardContent-root:hover": {
      backgroundColor: "#d6f379",
      color: "black !important",
    },
  },
  pagination: {
    "& button , .MuiPaginationItem-root": {
      color: "white",
    },
  },
  imageCard: {
    backgroundColor: "red",
    width: "100%",
    height: 220,
    "@media (min-width: 900px) and (max-width: 1300px)": {
      height: 160,
    },
    backgroundImage: 'url("./app-images/img1.png")',
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
});

const CardComponent = () => {
  const classes = useStyles();

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
          <CardContent>
            <div
              className={classes.imageCard}
              style={{
                backgroundImage: 'url("./app-images/img1.png")',
              }}
            ></div>
            <Typography sx={{ fontSize: 36 }} gutterBottom>
              Artist Name
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Followers: n~
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const Dashboard = () => {
  const classes = useStyles();
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
          >
            <FormControl className={classes.inputSearch} variant="outlined">
              <OutlinedInput
                placeholder="Buscar artista"
                id="search"
                name="search"
                endAdornment={
                  <InputAdornment position="end">
                    <Button className={classes.buttonSearch}>
                      <span>Search</span>
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid md={12} sm={12} xs={12} marginTop={5}>
            <p className={classes.subtitle}>
              Mostrando 4 resultados de nResultados
            </p>
          </Grid>
          <Grid container md={12} sm={12} xs={12} marginBottom={1}>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </Grid>
          <Pagination className={classes.pagination} count={10} />
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
