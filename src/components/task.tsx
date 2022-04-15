import React, {ChangeEvent} from 'react';
import s from "./Input.module.css";
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";
import {
    changeTaskStatusTC,
    changeTaskTitleTC,
    removeTaskTC
} from "../Redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Redux/store";
import {TaskStatuses, TaskType} from "../api/todolist-api";

type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
        .filter(task => task.id === props.taskID)[0])
    const dispatch = useDispatch()

    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleTC(task, newTitle))
    }
    const removeTaskItem = (taskID: string) => {
        dispatch(removeTaskTC(props.todolistID, taskID))
    }
    const onChangeStatusHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        // можно передать таску полностью, чтобы потом в санке не пришлось запрашивать ее
        const newIsDoneValue = event.currentTarget.checked
        dispatch(changeTaskStatusTC(props.todolistID, taskID, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
    }

    return (
        <li key={task.id} className={task.status === TaskStatuses.Completed ? s.activeTask : ''}>
            <Button name={'X'}
                    callback={() => removeTaskItem(task.id)}/>
            <input type="checkbox" onChange={(event) => onChangeStatusHandler(task.id, event)}
                   checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        </li>
    );
};