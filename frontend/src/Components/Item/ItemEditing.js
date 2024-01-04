import { Stack } from "@mui/material";
import ItemEditView from "./ItemEditView";
import { useEffect, useState } from "react";

const ItemEditing = (props) => {
    const [showImage, setShowImage] = useState("/Images/blank.jpg");

    useEffect(() => {
        props.image && setShowImage(URL.createObjectURL(props.image));
    }, [props.image])

    const changeImage = (e) => {
        props.setImage(e.target.files[0]);
    }    

    const changeName = (e) => {
        props.item.pavadinimas = e.target.value;
        props.setItem(props.item);
    }

    const changeDescription = (e) => {
        props.item.aprasymas = e.target.value;
        props.setItem(props.item);
    }

    const changeAmount = (e) => {
        props.item.kiekis = e.target.value;
        props.setItem(props.item);
    }

    const changePrice = (e) => {
        props.item.kaina = e.target.value;
        props.setItem(props.item);
    }

    const changeType = (e) => {
        props.item.tipas = e.target.value;
        props.setItem(props.item);
    }

    return <Stack spacing={2} style={{padding: 50, width: 600} }> 
        <ItemEditView 
            item={props.item} 
            image={props.image}
            showImage={showImage}
            changeImage={changeImage}
            changeName={changeName}
            changeAmount={changeAmount}
            changeDescription={changeDescription}
            changeType={changeType}
            changePrice={changePrice}
        /> 
    </Stack>
}

export default ItemEditing;