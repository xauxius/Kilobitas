import React, { useEffect, useState } from 'react';
import NavBar from '../Components/DiscussionNavBar';
import DiscussionsContainer from '../Components/DiscussionsContainer';
import ForumInfo from '../Components/ForumInfo';
import { Grid, CircularProgress } from '@mui/material';
import './Styles/Discussions.css';


const DiskusijosPage = () => {
    const [discussions, setDiscussions] = useState(null);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await fetch('https://localhost:7259/ListDiscussions');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDiscussions(data);
            } catch (error) {
                console.error("Failed to fetch discussions:", error);
                setDiscussions([]); // If the fetch fails, set discussions to an empty array or handle accordingly
            }
        };

        fetchDiscussions();
    }, []);

    return (
        <div>
            <NavBar />
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
