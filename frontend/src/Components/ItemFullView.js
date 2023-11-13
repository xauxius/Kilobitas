import { Card, CardMedia, Typography } from "@mui/material"


const ItemFullView = (props) => {

    return <Card sx={{ maxWidth: 500 }}>
        <CardMedia 
            component="img"
            alt="Prekė"
            height={300}
            image={props.image}
        />
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
    </Card> 
}

export default ItemFullView;