import React, { useEffect, useState } from "react";
import ItemFullView from "../../Components/Item/ItemFullView";
import ItemMinimalView from "../../Components/Item/ItemMinimalView";
import { CircularProgress, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import itemsClient from "../../Services/itemsService";
import recommendedClient from "../../Services/recommendedService";
import sessionService from "../../Services/sessionService";
import '../Styles/Item.css'; // Import the styles

const Item = (props) => {
    const [item, setItem] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        itemsClient.getItem(id).then(res => setItem(res.data));
        sessionService.getSessionId().then(sessionId => {
            recommendedClient.postSessionView(sessionId, id);
        });
        recommendedClient.getRecommended(id).then(res => setRecommended(res.data));
    }, [id]);

    useEffect(() => {
        if (item) {
            console.log(item);
        }
    }, [item]);

    return (
    <div className="itemContainer">
        {item ? (
        <ItemFullView item={item} />
        ) : (
        <CircularProgress />
        )}
        <hr />
        <h2 className="recommendedTitle">Žmonės taip pat domėjosi:</h2>
        <Stack direction="row" spacing={3} className="recommendedStack">
        {recommended.map((element, i) => (
            <ItemMinimalView key={i} item={element} />
        ))}
        </Stack>
    </div>
    );
};

export default Item;