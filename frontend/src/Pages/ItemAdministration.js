import { Grid } from "@mui/material";
import FilterSideBar from "../Components/FilterSideBar";
import ItemListView from "../Components/ItemListView";
import { items } from "../Objects/Data";

const ItemAdministration = () => {
    return <Grid container spacing={2} sx={{padding: 3}}>
        <Grid item xs={3}>
            <FilterSideBar />
        </Grid>
        <Grid item xs={9}>
            <ItemListView items={items} isEdit={true}/>
        </Grid>
    </Grid>
}

export default ItemAdministration;