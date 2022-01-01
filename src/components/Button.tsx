import React from "react";

type propsType = {
    name: string
    callback: ()=> void
    color?: string
}

export const Button = (props: propsType) => {
    const onClickHandler = () => {
        props.callback()
    }
    return(
        <button className={props.color} onClick={onClickHandler}>{props.name}</button>
    )
}