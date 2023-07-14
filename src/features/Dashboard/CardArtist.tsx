import { Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Artist } from "./lib/slices/artistsSlice";

const useStyles = makeStyles({
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
});

type CardProps = {
  artist: Artist;
};

const CardArtist = ({ artist }: CardProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickArtist = () => {
    navigate(`/artist/${artist.id}`);
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
        <Card onClick={handleClickArtist}>
          <CardContent style={{ minHeight: 300 }}>
            <div
              className={classes.imageCard}
              style={{
                backgroundImage: `url("${artist.image}")`,
                backgroundColor: "black",
              }}
            ></div>
            <div style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Typography
                sx={{ fontSize: 28, lineHeight: 1, fontWeight: 700 }}
                gutterBottom
              >
                {artist.name}
              </Typography>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                Followers: {artist.followers}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default CardArtist;
