import { useEffect } from "react";
import ItemMinimalView from "./ItemMinimalView";
import { CircularProgress, Grid } from "@mui/material";

const ItemListView = (props) => {
    useEffect(() => {
        console.log(props.items);
    }, [])
    return (
        <Grid container spacing={2} style={{ paddingTop: 30 }}>
            {props.items && props.items.length > 0 ? (
                props.items.map((element, i) => (
                    <Grid item xs={3} key={i}>
                        <ItemMinimalView
                            isEdit={props.isEdit}
                            item={element}
                            getChecked={props.getChecked}
                            checkForDelete={props.checkForDelete}
                        />
                    </Grid>
                ))
            ) : (
                <CircularProgress />
            )}
        </Grid>
    );
};

export default ItemListView;