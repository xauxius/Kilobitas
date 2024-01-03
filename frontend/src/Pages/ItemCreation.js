import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import { useState } from "react";
import itemsClient from "../Services/itemsService";
import ItemEditing from "../Components/ItemEditing";

const ItemEdit = () => {
    const [item, setItem] = useState({ pavadinimas: '', aprasymas: '', kiekis: '', kaina: '' });
    const [image, setImage] = useState();

    const create = () => {
        itemsClient.createItem(item);
    }

    return <Stack spacing={2} style={{padding: 50, width: 600} }> 
        <ItemEditing 
            item={item} 
            setItem={setItem}
        />
        <Button variant="contained" onClick={create}>Sukurti</Button>
    </Stack>
}

export default ItemEdit;