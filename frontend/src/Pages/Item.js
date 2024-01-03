import { useEffect, useState } from "react"
import ItemFullView from "../Components/ItemFullView"
import ItemMinimalView from "../Components/ItemMinimalView"
import { items, images } from "../Objects/Data"
import { CircularProgress, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import itemsClient from "../Services/itemsService"

const item = items[4]; // Paskui panaikinti!!
const image = images[4]; // Toza

const Item = (props) => {
    const [ item, setItem ] = useState();
    const [ recommended, setRecommended ] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        itemsClient.getItem(id).then(res => setItem(res.data));
        //itemsClient.getRecommended(id).then(res => setRecommended(res.data));
    }, [id]);

    return <div style={{padding: 20}}>
        {
            item ? <ItemFullView item={item} image={image} /> : <CircularProgress />
        }    
        <hr></hr>
        <h2>Žmonės taip pat domėjosi:</h2>
        <Stack direction="row" spacing={3}>
            {
                recommended.map( (element, i) => (
                    <ItemMinimalView
                        item={element}
                        image={images[i]}
                    />
                ))
            }
        </Stack>
    </div>
}

export default Item;