import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const ChoiceDialog = ({ open, onClose, onCatalogDelete, onDatabaseDelete }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="choice-dialog-title"
        >
            <DialogTitle id="choice-dialog-title">{"Pasirinkite veiksmą"}</DialogTitle>
            <DialogContent>
                {/* Content can be added here if needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCatalogDelete} color="primary">
                    Ištrinti iš katalogo
                </Button>
                <Button onClick={onDatabaseDelete} color="secondary">
                    Ištrinti iš duomenų bazės
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChoiceDialog;