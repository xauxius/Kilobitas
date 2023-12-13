import { Grid } from "@mui/material";
import ItemEditView from "../Components/ItemEditView";
import { items } from "../Objects/Data";
import { images } from "../Objects/Data";

const ItemEdit = () => {
    return <Grid container spacing={2} sx={{padding: 12}}>
        <ItemEditView item={items[0]} image={images[0]}/>
    </Grid>
}

export default ItemEdit;