import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import imageClient from "../../Services/imageService";
const ItemFullView = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    props.item.paveikslelis && imageClient.getImage(props.item.paveikslelis).then(res => setImage(res));
  }, [props.item])

  return (
    <Card sx={{ display: 'flex', maxWidth: 1200 }}>
      <CardMedia
        component="img"
        alt="Prekė"
        height={300}
        image={image}
        sx={{ width: 400, flexShrink: 0 }}
      />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h3" component="div">
              {props.item.pavadinimas}
            </Typography>
            <Typography variant="body2" component="div">
              {props.item.aprasymas}
            </Typography>
            <Typography variant="body2" component="div">
              {props.item.tipas}
            </Typography>
            <Typography variant="body2" component="div">
              Kaina: {props.item.kaina} eur.
            </Typography>
            <Typography variant="body2" component="div">
              Liko: {props.item.kiekis}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardActions>
            <Button color="success">
              Pridėti į krepšelį
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ItemFullView;