import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ItemMinimalView = (props) => {
    return <Card sx={{ maxWidth: 200 }}>
        <CardActionArea component={Link} to="/Prekė">
            <CardMedia 
                height={140}
                component="img"
                image={props.image}
                alt="Prekė"
            />
            <Typography gutterBottom variant="h5" component="div">
                {props.item.name}
            </Typography>
            <Typography gutterBottom variant="body2">
                {props.item.price} eur.
            </Typography>
        </CardActionArea>
    </Card>
}

export default ItemMinimalView;