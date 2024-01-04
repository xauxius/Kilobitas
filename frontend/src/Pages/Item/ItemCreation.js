import { Button, Stack } from "@mui/material";
import { useState } from "react";
import itemsClient from "../../Services/itemsService";
import ItemEditing from "../../Components/Item/ItemEditing";

const ItemEdit = () => {
    const [item, setItem] = useState({ pavadinimas: '', aprasymas: '', kiekis: 0, kaina: 0, tipas: 0 });
    const [image, setImage] = useState();

    const create = async () => {
        await itemsClient.createItem(item, image);
        window.location.assign("/Prekių-administravimas");
    }

    return <Stack spacing={2} style={{padding: 50, width: 600} }> 
        <ItemEditing 
            item={item}
            setItem={setItem}
            image={image}
            setImage={setImage}
        />
        <Button variant="contained" onClick={create}>Sukurti</Button>
    </Stack>
}

export default ItemEdit;