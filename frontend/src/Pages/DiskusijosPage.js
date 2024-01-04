import React, { useEffect, useState } from 'react';
import NavBar from '../Components/DiscussionNavBar';
import DiscussionsContainer from '../Components/DiscussionsContainer';
import ForumInfo from '../Components/ForumInfo';
import { Grid, CircularProgress } from '@mui/material';
import './Styles/Discussions.css';


const DiskusijosPage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [discussions, setDiscussions] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const hardcodedCategories = [ 'Sportas', 'Mokslas', 'Menai', 'Politika', 'Gamta', 'Kelionės', 'Maistas', 'Sveikata', 'Muzika'];

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                let url = `https://localhost:7259/ListDiscussions${selectedCategory ? 'ByCategory/' + selectedCategory : ''}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDiscussions(data);
            } catch (error) {
                console.error("Failed to fetch discussions:", error);
                setDiscussions([]); // Handle error
            }
        };

        fetchDiscussions();
    }, [selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div>
            <NavBar />
            <button onClick={toggleFilters}>{showFilters ? 'Slepti Filtrus' : 'Rodyti Filtrus'}</button>

            {showFilters && (
                <div className="category-selector">
                    <div className="category-selector">
                        <label htmlFor="category-dropdown">Select a Category: </label>
                        <select id="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">All Categories</option>
                            {hardcodedCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            

            <Grid container spacing={2} sx={{ padding: 3 }}>
                <Grid item xs={12}>
                    {discussions ? (
                        <DiscussionsContainer discussions={discussions} />
                    ) : (
                        <CircularProgress />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <ForumInfo />
                </Grid>
            </Grid>
        </div>
    );
};

export default DiskusijosPage;
