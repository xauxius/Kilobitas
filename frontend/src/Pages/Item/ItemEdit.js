import { Button, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import itemsClient from "../../Services/itemsService";
import { useParams } from "react-router-dom";
import ItemEditing from "../../Components/Item/ItemEditing";

const ItemEdit = (props) => {
    const [item, setItem] = useState();
    const [image, setImage] = useState();
    const { id } = useParams();

    useEffect(() => {
        itemsClient.getItem(id).then(res => setItem(res.data));
    }, [id])

    useEffect(() => {
        item && itemsClient.getItemTypes().then(res => res.data.map(t => {
            if (t.name == item.tipas) {
                console.log(item);
                console.log(item.tipas);
                item.tipas = t.value;
            } 
        }));
    }, [item])
    
    const save = async () => {
        await itemsClient.updateItem(item.id, item, image);
        window.location.assign("/Prekių-administravimas");
    }

    return <Stack spacing={2} style={{padding: 50, width: 600} }> 
        {
            item ? <ItemEditing 
                item={item} 
                setItem={setItem}
                image={image}
                setImage={setImage}
        /> : <CircularProgress />
        } 
        
        <Button variant="contained" onClick={save}>Išsaugoti</Button>
    </Stack>
}

export default ItemEdit;