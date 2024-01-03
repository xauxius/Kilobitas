import { MenuItem, TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import itemsClient from "../../Services/itemsService";

const ItemEditView = (props) => {
    const [types, setTypes] = useState([{value : 0, name: "Kraunasi..." }]);

    useEffect(() => {
        itemsClient.getItemTypes().then(res => setTypes(res.data));
    }, [])

    const getDefaultValue = () => {
        let defaultType;
        if (props.item.tipas) {
            for (let type of types) {
                if (type.name == props.item.tipas) {
                    defaultType = type.value; 
                }
            }
        }
        defaultType = defaultType ?? 0;
        return defaultType; 
    }

    const validateNumberInput = (event, isInt) => {
        // Allow only digits and control characters
        const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
        
        !isInt && validKeys.push('.');

        if (!validKeys.includes(event.key) && !event.metaKey && !event.ctrlKey) {
          event.preventDefault();
        }
    };

    const getValidationFunction = (isInt=false) => {
        const func = (event) => {
            validateNumberInput(event, isInt);
        }
        return func;
    }

    return <>
            <input type="file" onChange={props.changeImage} />
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
                defaultValue={getDefaultValue()}
                select
                onChange={props.changeType}
            >
                {
                    types.map((option) =>
                        <MenuItem key={option.value} value={option.value}>
                            {option.name}
                        </MenuItem>
                    )
                }
            </TextField>
            <TextField 
                id="kiekis"
                label="kiekis"
                defaultValue={props.item.kiekis}
                type="number"
                onChange={props.changeAmount}
                onKeyDown={getValidationFunction(true)}
                inputProps={{ min: 0 }}
            />
            <TextField 
                id="kaina"
                label="kaina"
                defaultValue={props.item.kaina}
                type="number"
                onChange={props.changePrice}
                onKeyDown={getValidationFunction()}
                inputProps={{ min: 0 }}
            />
    </>
};

export default ItemEditView;