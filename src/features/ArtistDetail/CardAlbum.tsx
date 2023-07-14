import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Album } from "./lib/slices/artistSlice";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "../../store";
import { addFavoriteAlbum, removeFavoriteAlbum } from "../MyAlbums/lib/api";

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

const CardAlbum = ({ album, refetchMyAlbums }: CardProps) => {
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

export default CardAlbum;
