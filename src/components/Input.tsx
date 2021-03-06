import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './Input.module.css';

type propsType = {
    error: boolean | null
    value: string
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void

}

export const Input = React.memo( (props: propsType) => {

    // ====================================
    console.log('Input ', props.value)
    // ====================================

    return (
        <input className={props.error ? s.emptyInput : s.input}
               onChange={props.onChangeHandler}
               onKeyPress={props.onKeyPressHandler}
               value={props.value}
        />
    )
})