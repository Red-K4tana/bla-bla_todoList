import React, {ChangeEvent, useCallback} from 'react';
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

export const Task = React.memo( (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
        .filter(task => task.id === props.taskID)[0])
    const dispatch = useDispatch()

    // ====================================
    console.log('Task ', props.taskID)
    // ====================================

    const changeTaskTitle = useCallback( (newTitle: string) => {
        dispatch(changeTaskTitleTC(task, newTitle))
    }, [task])
    const removeTaskItem = useCallback( (taskID: string) => {
        dispatch(removeTaskTC(props.todolistID, taskID))
    }, [props.todolistID])
    const onChangeStatusHandler = useCallback( (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        // можно передать таску полностью, чтобы потом в санке не пришлось запрашивать ее
        const newIsDoneValue = event.currentTarget.checked
        dispatch(changeTaskStatusTC(props.todolistID, taskID, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
    }, [props.todolistID])

    return (
        <li key={task.id} className={task.status === TaskStatuses.Completed ? s.activeTask : ''}>
            <Button name={'X'}
                    callback={() => removeTaskItem(task.id)}/>
            <input type="checkbox" onChange={(event) => onChangeStatusHandler(task.id, event)}
                   checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        </li>
    );
})