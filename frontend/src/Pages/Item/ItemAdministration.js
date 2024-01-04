import { Button, CircularProgress, Grid } from "@mui/material";
import FilterSideBar from "../../Components/Item/FilterSideBar";
import ItemListView from "../../Components/Item/ItemListView";
import { useEffect, useState } from "react";
import itemsClient from "../../Services/itemsService";
import recommendedClient from "../../Services/recommendedService";

const ItemAdministration = () => {
    const [items, setItems] = useState();
    const [selected, setSelected] = useState();

    useEffect(() => {
        itemsClient.getItems().then(res => setItems(res.data));
    }, [])

    useEffect(() => {
        let newSelected;
        if (items) {
            for (let item of items) {
                newSelected = {...newSelected, [item.id]: false};
            }
            setSelected(newSelected);   
        }
    }, [items])

    const getChecked = (id) => {
        return selected[id];
    }

    const checkForDelete = (id, event) => {
        setSelected({
            ...selected,
            [id]: event.target.checked
        });
    }

    const deleteItems = () => {
        for (let item of items) {
            if (selected[item.id]) {
                itemsClient.deleteItem(item.id);
            }
        }
        itemsClient.getItems().then(res => setItems(res.data));
    }

    const updateRecommended = () => {
        recommendedClient.updateRecommended();
    }

    return <Grid container spacing={2} sx={{padding: 3}}>
        <Grid item xs={3} >
            <FilterSideBar />
        </Grid>
        <Grid item xs={9} >
            <Button variant="contained" onClick={updateRecommended}>Atnaujinti rekomendacijas</Button>
            <Button variant="contained" color="success" href="prekės-kūrimas">Kurti naują</Button>
            {
                items && selected ?
                <ItemListView items={items} getChecked={getChecked} checkForDelete={checkForDelete} isEdit={true}/> :
                <CircularProgress />
            }
            <Button variant="contained" color="error" onClick={deleteItems}>
                Pašalinti prekes
            </Button>
        </Grid>
    </Grid>
}

export default ItemAdministration;