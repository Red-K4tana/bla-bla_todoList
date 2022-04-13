import React, {ChangeEvent} from 'react';
import s from "./Input.module.css";
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";
import {changeTaskStatusTC, changeTaskTitleAC, removeTaskItemAC} from "../Redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/store";
import {TasksType} from "../AppWithRedux";
import {TaskStatuses} from "../api/todolist-api";

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
    const onChangeStatusHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        // можно передать таску полностью, чтобы потом в санке не пришлось запрашивать ее
        const newIsDoneValue = event.currentTarget.checked
        dispatch(changeTaskStatusTC(props.todolistID, taskID, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
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