import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
const ItemFullView = (props) => {
  return (
    <Card sx={{ display: 'flex', maxWidth: 1200 }}>
      <CardMedia
        component="img"
        alt="Prekė"
        height={300}
        image={props.image}
        sx={{ width: 400, flexShrink: 0 }}
      />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <CardContent>
            <Typography variant="h3" component="div">
              {props.item.name}
            </Typography>
            <Typography variant="body2" component="div">
              {props.item.description}
            </Typography>
            <Typography variant="body2" component="div">
              {props.item.itemType}
            </Typography>
            <Typography variant="body2" component="div">
              Liko: {props.item.amount}
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