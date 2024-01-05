import { Box, Button, CircularProgress, Grid, Stack } from "@mui/material";
import FilterSideBar from "../../Components/Item/FilterSideBar";
import ItemListView from "../../Components/Item/ItemListView";
import { useEffect, useState } from "react";
import itemsClient from "../../Services/itemsService";
import recommendedClient from "../../Services/recommendedService";
import SuccessDialog from "../../Components/SuccessDialog";
import ChoiceDialog from "../../Components/ChoiceDialog";

const ItemAdministration = () => {
    const [items, setItems] = useState();
    const [filtered, setFiltered] = useState();
    const [selected, setSelected] = useState({});

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [dialogText, setDialogText] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        itemsClient.getAllItems().then(res => {
            setItems(res.data);
            setFiltered(res.data);
        });
    }, [])

    useEffect(() => {
        let newSelected = {};
        if (filtered) {
            for (let item of filtered) {
                newSelected = {...newSelected, [item.id]: false};
            }
            setSelected(newSelected);   
        }
    }, [filtered])

    const getChecked = (id) => {
        return selected[id];
    }

    const checkForDelete = (id, event) => {
        setSelected({
            ...selected,
            [id]: event.target.checked
        });
    }

    const deleteItems = async () => {
        for (let item of filtered) {
            if (selected[item.id]) {
                await itemsClient.deleteItem(item.id);
            }
        }
        setOpenDialog(false);
        setDialogText("Prekės sėkmingai pašalintos");
        setOpenSuccessDialog(true);
    }

    const deleteItemsFromCatalog = async () => {
        for (let item of filtered) {
            if (selected[item.id]) {
                await itemsClient.softDeleteItem(item.id);
            }
        }
        setOpenDialog(false);
        setDialogText("Prekės sėkmingai išimtos iš katalogo");
        setOpenSuccessDialog(true);
    }

    const restoreItems = async () => {
        for (let item of filtered) {
            if (selected[item.id]) {
                await itemsClient.restoreItem(item.id);
            }
        }

        setOpenDialog(false);
        setDialogText("Prekės sėkmingai grąžintos į katalogą");
        setOpenSuccessDialog(true);
    }

    const updateRecommended = () => {
        recommendedClient.updateRecommended();
        setDialogText("Rekomendacijos sėkmingai atnaujintos");
        setOpenSuccessDialog(true);
    }

    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false); // Close the dialog
        window.location.assign("/Prekių-administravimas"); // Redirect as needed
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <FilterSideBar 
                        isAdmin = {true}
                        items = {items}
                        setFiltered = {setFiltered}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Stack direction="row" spacing={2} mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={updateRecommended}>
                                    Atnaujinti rekomendacijas
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="success" href="prekės-kūrimas">
                                    Kurti naują prekę
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="error" onClick={handleOpenDialog}>
                                    Pašalinti pasirinktas prekes
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={restoreItems}>
                                    Grąžinti prekes į katalogą
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>

                    {
                    filtered ? (
                        filtered.length > 0 ?
                        <ItemListView items={filtered} getChecked={getChecked} checkForDelete={checkForDelete} isEdit={true} />
                        : <center><h1 style={{paddingTop: 50}}>Prekės nerastos</h1></center>
                    ) : (
                        <CircularProgress />
                    )
                    }

                <SuccessDialog 
                    open={openSuccessDialog} 
                    onClose={handleCloseSuccessDialog}
                >
                    {dialogText}
                </SuccessDialog>

                <ChoiceDialog 
                    open={openDialog}
                    onClose={handleCloseDialog}
                    onCatalogDelete={deleteItemsFromCatalog}
                    onDatabaseDelete={deleteItems}
                />

                </Grid>
            </Grid>
        </Box>
    );
}

export default ItemAdministration;