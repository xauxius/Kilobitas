import { Grid } from "@mui/material";
import FilterSideBar from "../Components/FilterSideBar"
import ItemFull from "../Objects/itemFull";
import ItemMinimalView from "../Components/ItemMinimalView";
import { useEffect } from "react";
import {items, images} from "../Objects/Data";


const Catalog = () => {
    useEffect(() => {
        console.log(items[0]);
    }, [])

    return   <> 
    <FilterSideBar />
    <Grid container spacing={2}>
        {
            items.map((element, i) => (
                <Grid item xs={3} key={i}>
                    <ItemMinimalView 
                        item={element}
                        image={images[i]}
                    />
                </Grid>
            ))
        }
    </Grid>
    </>
}

export default Catalog;