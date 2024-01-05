import { Alert, Button, Stack } from "@mui/material";
import { useState } from "react";
import itemsClient from "../../Services/itemsService";
import ItemEditing from "../../Components/Item/ItemEditing";
import SuccessDialog from "../../Components/SuccessDialog";

const ItemEdit = () => {
    const [item, setItem] = useState({ pavadinimas: '', aprasymas: '', kiekis: 0, kaina: 0, tipas: 0 });
    const [image, setImage] = useState();

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const create = async () => {
        try {
            await itemsClient.createItem(item, image);
            setOpenSuccessDialog(true); // Open success dialog
        } catch (error) {
            // Handle any errors here
            console.error("Failed to save item:", error);
        }
    }

    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false); // Close the dialog
        window.location.assign("/Prekių-administravimas"); // Redirect as needed
    }

    return <center>
        <Stack spacing={2} style={{ width: 600, paddingBottom: 50} }> 
            <ItemEditing 
                item={item}
                setItem={setItem}
                image={image}
                setImage={setImage}
            />
            {
                !item.pavadinimas && <Alert severity="error">Pavadinimas negali būt tuščias</Alert>
            }
            <SuccessDialog 
                open={openSuccessDialog} 
                onClose={handleCloseSuccessDialog}
            >
                Prekė sėkmingai sukurta!
            </SuccessDialog>
            <Button variant="contained" onClick={create} disabled={!item.pavadinimas}>Sukurti</Button>
        </Stack>
    </center> 
}

export default ItemEdit;