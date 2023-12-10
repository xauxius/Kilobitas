import { Button, Grid, Stack } from "@mui/material";
import FilterSideBar from "../Components/FilterSideBar"
import ItemFull from "../Objects/itemFull";
import ItemMinimalView from "../Components/ItemMinimalView";
import { useEffect } from "react";
import {items, images} from "../Objects/Data";
import { Link } from "react-router-dom";

const Catalog = () => {
    useEffect(() => {
        console.log(items[0]);
    }, [])

    return   <Grid container spacing={2} sx={{padding: 3}}>
    <Grid item xs={3}>
        <FilterSideBar />
    </Grid>
    <Grid item xs={9}>
        <Grid container spacing={2} style={{paddingTop: 100}}>
            {
                items.map((element, i) => (
                    <Grid item xs={4} key={i}>
                        <ItemMinimalView 
                            item={element}
                            image={images[i]}
                        />
                    </Grid>
                ))
            }
        </Grid>
    </Grid>
    </Grid>
}

export default Catalog;