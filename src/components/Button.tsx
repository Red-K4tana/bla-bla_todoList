import React from "react";

type propsType = {
    name: string
    callback: ()=> void
    color?: string
}

export const Button = React.memo( (props: propsType) => {
    const onClickHandler = () => {
        props.callback()
    }

    // ====================================
    console.log('Button ', props.name)
    // ====================================

    return(
        <button className={props.color} onClick={onClickHandler}>{props.name}</button>
    )
})