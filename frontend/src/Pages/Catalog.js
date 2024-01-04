import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import FilterSideBar from "../Components/FilterSideBar"
import ItemFull from "../Objects/itemFull";
import ItemMinimalView from "../Components/ItemMinimalView";
import { useEffect, useState } from "react";
import {items} from "../Objects/Data";
import { Link } from "react-router-dom";
import ItemListView from "../Components/ItemListView";
import itemsClient from "../Services/itemsService";

const Catalog = () => {
    const [items, setItems] = useState();

    useEffect(() => {
        itemsClient.getItems().then(res => setItems(res.data));
    }, [])

    return   <Grid container spacing={2} sx={{padding: 3}}>
    <Grid item xs={3}>
        <div className="nav-button">
            <Link to="/Prekių-administravimas">
                Prekių administracija
            </Link>
        </div>
        <FilterSideBar />
    </Grid>
    <Grid item xs={9}>
        {
            <ItemListView items={items} isEdit={false} />
        }
    </Grid>
    </Grid>
}

export default Catalog;