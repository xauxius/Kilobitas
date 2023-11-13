import ItemFull from "./itemFull";

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

export {items, images};