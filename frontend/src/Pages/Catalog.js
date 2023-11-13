import { Grid } from "@mui/material";
import FilterSideBar from "../Components/FilterSideBar"
import ItemFull from "../Objects/itemFull";
import ItemMinimalView from "../Components/ItemMinimalView";
import { useEffect } from "react";

const items = [
    new ItemFull(1, "AMD Procesorius", 500, "Labai geras", "Procesorius", 200),
    new ItemFull(2, "Intel Procesorius", 600, "Labai geras", "Procesorius", 150),
    new ItemFull(3, "Nvidia vaizdo plokštė", 650, "Labai geras", "Vaizdo plokštė", 100),
    new ItemFull(4, "RAM", 450, "Labai geras", "Operatyvioji atmintis", 300),
    new ItemFull(5, "Kietasis diskas", 200, "Labai geras", "Kietasis diskas", 50),
]
const images = [
    "Images/proc.jpg",
    "Images/proc.jpg",
    "Images/gpu.jpg",
    "Images/RAM.jpg",
    "Images/ssd.png"
]

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