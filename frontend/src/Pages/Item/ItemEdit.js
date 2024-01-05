import { Alert, Button, CircularProgress, Snackbar, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import itemsClient from "../../Services/itemsService";
import { useParams } from "react-router-dom";
import ItemEditing from "../../Components/Item/ItemEditing";
import SuccessDialog from "../../Components/SuccessDialog";

const ItemEdit = (props) => {
    const [item, setItem] = useState();
    const [image, setImage] = useState();
    const { id } = useParams();

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    useEffect(() => {
        itemsClient.getItem(id).then(res => setItem(res.data));
    }, [id])

    useEffect(() => {
        item && itemsClient.getItemTypes().then(res => res.data.map(t => {
            if (t.name == item.tipas) {
                console.log(item.pavadinimas);
                item.tipas = t.value;
            } 
        }));
    }, [item])
    
    const save = async () => {
        try {
            await itemsClient.updateItem(item.id, item, image);
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
        <Stack spacing={2} style={{ width: 600, paddingBottom: 50 } }> 
            {
                item ? <>
                <ItemEditing 
                    item={item} 
                    setItem={setItem}
                    image={image}
                    setImage={setImage}
                />
                {
                    !item.pavadinimas && <Alert severity="error">Pavadinimas negali būt tuščias</Alert>
                }
                <Button variant="contained" onClick={save} disabled={!item.pavadinimas}>Išsaugoti</Button>
                <SuccessDialog 
                    open={openSuccessDialog} 
                    onClose={handleCloseSuccessDialog}
                >
                    Prekė sėkmingai atnaujinta!
                </SuccessDialog>
                </> : <CircularProgress />
            } 
            
            
        </Stack>
    </center>
    
}

export default ItemEdit;