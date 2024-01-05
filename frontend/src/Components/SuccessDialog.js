import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

const SuccessDialog = ({ open, onClose, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="success-dialog-title"
            aria-describedby="success-dialog-description"
        >
            <DialogTitle id="success-dialog-title">{"Operacija sėkminga"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="success-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Gerai
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessDialog;