import { useEffect, useState } from "react"
import ItemFullView from "../../Components/Item/ItemFullView"
import ItemMinimalView from "../../Components/Item/ItemMinimalView"
import { CircularProgress, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import itemsClient from "../../Services/itemsService"
import recommendedClient from "../../Services/recommendedService"
import sessionService from "../../Services/sessionService"


const Item = (props) => {
    const [ item, setItem ] = useState();
    const [ recommended, setRecommended ] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        itemsClient.getItem(id).then(res => setItem(res.data));
        sessionService.getSessionId().then(res => 
            recommendedClient.postSessionView(res, id)
        );
        recommendedClient.getRecommended(id).then(res => setRecommended(res.data));
    }, [id]);

    return <div style={{padding: 20}}>
        {
            item ? <ItemFullView item={item} /> : <CircularProgress />
        }    
        <hr></hr>
        <h2>Žmonės taip pat domėjosi:</h2>
        <Stack direction="row" spacing={3}>
            {
                recommended.map( (element, i) => (
                    <ItemMinimalView
                        item={element}
                    />
                ))
            }
        </Stack>
    </div>
}

export default Item;