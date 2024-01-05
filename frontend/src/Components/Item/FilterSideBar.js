import { Button, Checkbox, CircularProgress, FormControlLabel, Slider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import itemsClient from "../../Services/itemsService";

const FilterSideBar = (props) => {
    const [sValue, setSValue] = useState([0, 1000]);
    const [itemTypes, setItemTypes] = useState();
    const [checkedValues, setCheckedValues] = useState([]);
    const [showHidden, setShowHidden] = useState(true);

    useEffect(() => {
        itemsClient.getItemTypes().then(res => setItemTypes(res.data));
    }, []);

    useEffect(() => {
        itemTypes && setCheckedValues(itemTypes.map(_ => false));
    }, [itemTypes])

    const setChecked = (index) => {
        return (event) => {
            const newValues = [...checkedValues];
            newValues[index] = !newValues[index];
            setCheckedValues(newValues);
        }
    }

    const filterValues = () => {
        if (!itemTypes) {
            return props.items;
        }
        const filtered = []
        for (let item of props.items) {
            if (itemShouldFilter(item)) {
                filtered.push(item);
            }
        }
        console.log(filtered)
        props.setFiltered(filtered);
    }

    const itemShouldFilter = (item) => {
        let shouldFilter = true;
        if (!typeFilterValues().includes(item.tipas)) {
            console.log(typeFilterValues());
            console.log(item.tipas);
            shouldFilter = false;
        }
        if (!showHidden && !item.rodyti_kataloge) {
            shouldFilter = false;
        }
        if (item.kaina < sValue[0] || item.kaina > sValue[1]) {
            shouldFilter = false;
        }
        return shouldFilter;
    }

    const typeFilterValues = () => {
        return checkedValues.map((c, index) => {
            if (c) {
                return itemTypes[index].value;
            }
        })
    }

    const handleChange = (event, newValue) => {
        setSValue(newValue);
    };

    return <Stack spacing={2}>
        <h2>Filtruoti pagal:</h2>
        <h3>Tipas:</h3>
        {
            itemTypes ? itemTypes.map((itemType, index) =>
                <FormControlLabel key={index}
                    control={<Checkbox 
                        onChange={setChecked(index)}
                    />}
                    label={itemType.name}
                /> 
            ) : <CircularProgress />
        }

        {
            props.isAdmin &&
            <>
                <h3>
                    Kataloge paslėptos:
                </h3>
                <FormControlLabel control={<Checkbox onChange={(e) => setShowHidden(e.target.checked)} defaultChecked />} label="Rodyti" />
            </>
        }
        <h3>Kaina:</h3>
        <Slider 
            value={sValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
        />
        <Button color="success" variant="contained" onClick={filterValues}>
            Filtruoti
        </Button>
    </Stack>
}

export default FilterSideBar;