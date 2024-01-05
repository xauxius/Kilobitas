import { CircularProgress, Grid } from "@mui/material";
import FilterSideBar from "../../Components/Item/FilterSideBar"
import { useEffect, useState } from "react";
import ItemListView from "../../Components/Item/ItemListView";
import itemsClient from "../../Services/itemsService";

const Catalog = () => {
    const [items, setItems] = useState();
    const [filtered, setFiltered] = useState();

    useEffect(() => {
        itemsClient.getItems().then(res => {
            setItems(res.data);
            setFiltered(res.data);
        });
    }, [])

    return <>
        <Grid container spacing={2} sx={{padding: 3}}>
            <Grid item xs={3}>
                <FilterSideBar items={items} setFiltered={setFiltered}/>
            </Grid>
            <Grid item xs={9}>
                {
                    filtered ? (
                        filtered.length > 0 ?
                        <ItemListView items={filtered} isEdit={false} />
                        : <center><h1 style={{paddingTop: 50}}>Prekės nerastos</h1></center>

                    ) : <CircularProgress />
                }
            </Grid>
        </Grid>
    </> 
        
}

export default Catalog;