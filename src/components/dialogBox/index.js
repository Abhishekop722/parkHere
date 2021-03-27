import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import _ from 'lodash'

function DialogBox(props) {
    const { confirmBoxopen, handleDialogClose, handleSubmit, text, cancelText, dialogTitle, okBtnComp } = props
    return (<Dialog
        open={confirmBoxopen}
        onClose={handleDialogClose}
    >
        <DialogTitle style={{ minWidth: '200px' }} id="alert-dialog-title">{dialogTitle || "Confirmation"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {text}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
                {!cancelText ? 'Cancel' : cancelText}
            </Button>
            {(cancelText && cancelText.toLowerCase() !== 'close') ?
                okBtnComp ? okBtnComp :
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        YES
      </Button> :
                <></>
            }
        </DialogActions>
    </Dialog>);
}

export default DialogBox