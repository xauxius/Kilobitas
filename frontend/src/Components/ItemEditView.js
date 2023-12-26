import { Button, Card, CardActions, CardContent, CardMedia, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
const tipai = ["Procesorius", "Operatyvioji atmintis", "Kietasis diskas"]

const ItemEditView = (props) => {
  return <>
            <img src="public/Images/proc.jpg" width="300" height="300"></img>
            <TextField
                required
                id="pavadinimas"
                label="Pavadinimas"
                defaultValue={props.item.pavadinimas}
                onChange={props.changeName}
            />
            <TextField
                id="aprasymas"
                label="Aprašymas"
                multiline
                maxRows={6}
                defaultValue={props.item.aprasymas}
                onChange={props.changeDescription}
            />
            <TextField
                id="tipas"
                label="Prekės tipas"
                defaultValue={props.item.tipas}
                select
                onChange={props.changeType}
            >
                {
                    tipai.map((option) => {
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    })
                }
            </TextField>
            <TextField 
                id="kiekis"
                label="kiekis"
                defaultValue={props.item.kiekis}
                type="number"
                onChange={props.changeAmount}
            />
            <TextField 
                id="kaina"
                label="kaina"
                defaultValue={props.item.kaina}
                type="number"
                onChange={props.changePrice}
            />
  </>
};

export default ItemEditView;