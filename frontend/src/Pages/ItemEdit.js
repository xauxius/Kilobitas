import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import ItemEditView from "../Components/ItemEditView";
import { images } from "../Objects/Data";
import { useEffect, useState } from "react";
import itemsClient from "../Services/itemsService";
import {withRouter} from "react-router";

const ItemEdit = (props) => {
    const [item, setItem] = useState();

    useEffect(() => {
        itemsClient.getItem(props.match.params.id).then(res => setItem(res.data));
    }, [])

    const changeName = (e) => {
        item.pavadinimas = e.target.value;
        setItem(item);
    }

    const changeDescription = (e) => {
        item.aprasymas = e.target.value;
        setItem(item);
    }

    const changeAmount = (e) => {
        item.kiekis = e.target.value;
        setItem(item);
    }

    const changePrice = (e) => {
        item.kaina = e.target.value;
        setItem(item);
    }

    const changeType = (e) => {
        item.type = e.target.value;
        setItem(item);
    }

    const save = () => {
        itemsClient.updateItem(item.id, item);
    }

    return <Stack spacing={2} style={{padding: 50, width: 600} }> 
        {
            item ? <ItemEditView 
            item={item} 
            image={images[0]}
            changeName={changeName}
            changeAmount={changeAmount}
            changeDescription={changeDescription}
            changeType={changeType}
            changePrice={changePrice}
        /> : <CircularProgress />
        }
        
        <Button variant="contained" onClick={save}>Išsaugoti</Button>
    </Stack>
}

export default withRouter(ItemEdit);