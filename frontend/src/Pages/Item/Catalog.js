import { Grid } from "@mui/material";
import FilterSideBar from "../../Components/Item/FilterSideBar"
import { useEffect, useState } from "react";
import ItemListView from "../../Components/Item/ItemListView";
import itemsClient from "../../Services/itemsService";

const Catalog = () => {
    const [items, setItems] = useState();

    useEffect(() => {
        itemsClient.getItems().then(res => setItems(res.data));
    }, [])

    return <>
        <Grid container spacing={2} sx={{padding: 3}}>
            <Grid item xs={3}>
                <FilterSideBar />
            </Grid>
            <Grid item xs={9}>
                {
                    <ItemListView items={items} isEdit={false} />
                }
            </Grid>
        </Grid>
    </> 
        
}

export default Catalog;