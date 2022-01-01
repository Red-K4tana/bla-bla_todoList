import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";

type AddItemFormPropsType = {
    name: string
    addItem: (title: string)=> void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
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

    return (
        <div>
            <Input
                value={title}
                onChangeHandler={changeTitle}
                onKeyPressHandler={pressEnter}
                error={error}
            />
            <Button name={props.name} callback={addItem}/>
            {error && errorMessage}
        </div>
    );
};

