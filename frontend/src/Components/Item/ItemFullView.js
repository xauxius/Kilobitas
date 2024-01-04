
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import imageClient from "../../Services/imageService";
import cartClient from "../../Services/cartService";
import cart from "../../Objects/cart"; 

const ItemFullView = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    props.item.paveikslelis && imageClient.getImage(props.item.paveikslelis).then(res => setImage(res));
  }, [props.item])
  const addToCart = async () => {
    try {
      const cartItem = new cart( props.item.id, props.item.id, localStorage.getItem('naudotojas'), 1);

      await cartClient.createCart(cartItem);

      console.log("Item added to the cart successfully");
    } catch (error) {
      console.error("Error adding item to the cart", error);
    }
  };
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
          <Button color="success" onClick={addToCart}>
              Pridėti į krepšelį
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ItemFullView;