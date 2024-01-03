import { Card, CardActionArea, CardMedia, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import itemsClient from "../../Services/itemsService";

const ItemMinimalView = (props) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        props.item.paveikslelis && itemsClient.getImage(props.item.paveikslelis).then(res => setImage(res));
    }, [props.item])

    return <Card sx={{ maxWidth: 200 }}>
        <CardActionArea component={Link} to={props.isEdit ? "/Prekės-redagavimas/"+props.item.id : "/Prekė/"+props.item.id}>
            <CardMedia 
                height={140}
                component="img"
                image={image}
                alt="Prekė"
            />
            <Typography gutterBottom variant="h5" component="div">
                {props.item.pavadinimas}
            </Typography>
        </CardActionArea>
        <Typography gutterBottom variant="body2">
                {props.item.kaina} eur.
        </Typography>
        {
            props.isEdit ?
            <Checkbox 
                checked={props.getChecked(props.item.id)}
                onChange={(event) => props.checkForDelete(props.item.id, event)} 
            /> : <></>
        }
    </Card>
}

export default ItemMinimalView;