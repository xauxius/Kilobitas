import { useEffect } from "react"
import ItemFullView from "../Components/ItemFullView"
import ItemMinimalView from "../Components/ItemMinimalView"
import { items, images } from "../Objects/Data"
import { Stack } from "@mui/material"

const item = items[4];
const image = images[4];

const Item = (props) => {    
    return <div style={{padding: 20}}>
        <ItemFullView item={item} image={image} />
        <hr></hr>
        <h2>Žmonės taip pat domėjosi:</h2>
        <Stack direction="row" spacing={3}>
            {
                items.slice(0, 4).map( (element, i) => (
                    <ItemMinimalView
                        item={element}
                        image={images[i]}
                    />
                ))
            }
        </Stack>
    </div>
}

export default Item;