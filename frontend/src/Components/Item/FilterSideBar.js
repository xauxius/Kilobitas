import { Checkbox, FormControlLabel, Slider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const FilterSideBar = () => {
    const [sValue, setSValue] = useState([200, 1500]);

    const handleChange = (event, newValue) => {
        setSValue(newValue);
        console.log(newValue);
    };

    return <Stack spacing={2}>
        <h2>Filtruoti pagal:</h2>
        <h3>Tipas:</h3>
        <FormControlLabel control={<Checkbox />} label="Vaizdo plokštė" />
        <FormControlLabel control={<Checkbox />} label="Procesorius" />
        <FormControlLabel control={<Checkbox />} label="Operatyvioji atmintis" />
        <FormControlLabel control={<Checkbox />} label="Kietasis diskas" />
        <FormControlLabel control={<Checkbox />} label="Motininė plokštė" />
        <FormControlLabel control={<Checkbox />} label="Aušintuvas" />
        <FormControlLabel control={<Checkbox />} label="Korpusas" />
        <h3>Kaina:</h3>
        <Slider 
            value={sValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
        />
    </Stack>
}

export default FilterSideBar;