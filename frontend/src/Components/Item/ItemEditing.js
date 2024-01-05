import { Stack } from "@mui/material";
import ItemEditView from "./ItemEditView";
import { useEffect, useState } from "react";
import imageClient from "../../Services/imageService";

const ItemEditing = (props) => {
    const [showImage, setShowImage] = useState("/Images/blank.jpg");

    useEffect(() => {
        props.item.paveikslelis && imageClient.getImage(props.item.paveikslelis).then(res => setShowImage(res));
    }, [])

    useEffect(() => {
        props.image && setShowImage(URL.createObjectURL(props.image));
    }, [props.image])

    const changeImage = (e) => {
        props.setImage(e.target.files[0]);
    }    

    const changeName = (e) => {
        props.setItem({...props.item, pavadinimas: e.target.value });
    }

    const changeDescription = (e) => {
        props.setItem({...props.item, aprasymas: e.target.value });
    }

    const changeAmount = (e) => {
        props.setItem({...props.item, kiekis: e.target.value });
    }

    const changePrice = (e) => {
        props.setItem({...props.item, kaina: e.target.value });
    }

    const changeType = (e) => {
        props.setItem({...props.item, tipas: e.target.value });
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