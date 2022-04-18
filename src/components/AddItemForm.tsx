import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";
import TextField from '@mui/material/TextField';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    name: string
    addItem: (title: string)=> void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    const [error, setError] = useState(false)
    const [title, setTitle] = useState('')

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            addItem()
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const errorMessage = <div style={{color: 'red'}}>This is required</div>

    // ====================================
    console.log('AddItemForm ', props.name)
    // ====================================

    return (
        <div>
            <TextField
                value={title}
                variant="outlined"
                onChange={changeTitle}
                onKeyPress={pressEnter}
                error={error}
                label="Title"
            />
            <IconButton color="primary" onClick={addItem}>
                <AddBox/>
            </IconButton>
            {error && errorMessage}
        </div>
    );
});

