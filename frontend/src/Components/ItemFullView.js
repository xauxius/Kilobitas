import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import itemsClient from "../Services/itemsService";
import cartClient from "../Services/cartService";
import cart from "../Objects/cart"; 

const ItemFullView = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    props.item.paveikslelis && itemsClient.getImage(props.item.paveikslelis).then(res => setImage(res));
  }, [props.item])

  const addToCart = async () => {
    try {
      const cartItem = new cart( props.item.id, props.item.id, props.item.id, 1);

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
            {/* ... (other item details) */}
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
