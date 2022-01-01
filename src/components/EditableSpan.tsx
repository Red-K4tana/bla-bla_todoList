import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            offEditMode()
    }

    const [editMode, setEditMode] = useState(false)
    const onEditMode = () => {
      setEditMode(true)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    return (
        editMode
            ? <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={offEditMode}
                autoFocus={true}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

