import ItemMinimalView from "./ItemMinimalView";
import { Grid } from "@mui/material";
import { images } from "../Objects/Data";

const ItemListView = (props) => {
    return <Grid container spacing={2} style={{paddingTop: 100}}>
            {
                props.items.map((element, i) => (
                    <Grid item xs={4} key={i}>
                        <ItemMinimalView isEdit={props.isEdit}
                            item={element}
                            image={images[i]}
                        />
                    </Grid>
                ))
            }
        </Grid>
}

export default ItemListView