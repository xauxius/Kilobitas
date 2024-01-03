import { Button, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import itemsClient from "../../Services/itemsService";
import { useParams } from "react-router-dom";
import ItemEditing from "../../Components/Item/ItemEditing";

const ItemEdit = (props) => {
    const [item, setItem] = useState();
    const { id } = useParams();

    useEffect(() => {
        itemsClient.getItem(id).then(res => setItem(res.data));
    }, [id])

    
    const save = () => {
        itemsClient.updateItem(item.id, item);
    }

    return <Stack spacing={2} style={{padding: 50, width: 600} }> 
        {
            item ? <ItemEditing 
                item={item} 
                setItem={setItem}
        /> : <CircularProgress />
        } 
        
        <Button variant="contained" onClick={save}>Išsaugoti</Button>
    </Stack>
}

export default ItemEdit;