import React, {forwardRef, useState} from 'react';
import {Alert, AlertProps, Button, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/store";
import {setAppErrorAC, SetAppErrorActionType} from "../Redux/app-reducer";



export const ErrorSnackbar = () => {

    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setAppErrorAC(null))
    }

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={"error"} sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};
