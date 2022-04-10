import React, {ChangeEvent} from 'react';
import s from "./Input.module.css";
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC} from "../Redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/store";
import {TasksType} from "../AppWithRedux";

type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TasksType>(state => state.tasks[props.todolistID]
        .filter(task => task.id === props.taskID)[0])
    const dispatch = useDispatch()

    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistID, task.id, newTitle))
    }
    const removeTaskItem = (taskID: string) => {
        dispatch(removeTaskItemAC(props.todolistID, taskID))
    }
    const onChangeStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistID, taskId, event.currentTarget.checked))
    }

    return (
        <li key={task.id} className={task.isDone ? s.activeTask : ''}>
            <Button name={'X'}
                    callback={() => removeTaskItem(task.id)}/>
            <input type="checkbox" onChange={(event) => onChangeStatusHandler(task.id, event)}
                   checked={task.isDone}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        </li>
    );
};