import { Button, Card, CardActions, CardContent, CardMedia, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
const tipai = ["Procesorius", "Operatyvioji atmintis", "Kietasis diskas"]

const ItemEditView = (props) => {
  return (
    <Card sx={{ display: 'flex', maxWidth: 1200 }}>
      <CardMedia
        component="img"
        alt="Prekė"
        height={300}
        image={props.image}
        sx={{ width: 400, flexShrink: 0 }}
      />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <TextField
                required
                id="pavadinimas"
                label="Pavadinimas"
                defaultValue={props.item.name}
            />
            <TextField
                id="aprasymas"
                label="Aprašymas"
                multiline
                maxRows={6}
                defaultValue={props.item.description}
            />
            <TextField
                id="tipas"
                label="Prekės tipas"
                defaultValue={props.item.itemType}
                select
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
                defaultValue={props.item.amount}
                type="number"
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ItemEditView;