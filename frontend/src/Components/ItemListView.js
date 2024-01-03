import ItemMinimalView from "./ItemMinimalView";
import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import itemsClient from "../Services/itemsService";

const ItemListView = (props) => {
    return (
        <Grid container spacing={2} style={{ paddingTop: 100 }}>
            {props.items && props.items.length > 0 ? (
                props.items.map((element, i) => (
                    <Grid item xs={4} key={i}>
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