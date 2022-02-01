import React, {ChangeEvent} from 'react';
import s from "./Input.module.css";
import {Button} from "./Button";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC} from "../reducer/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TasksType} from "../AppWithRedux";

type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const TaskItem = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TasksType>(state => state.tasks[props.todolistId]
        .filter(t => t.id===props.taskId)[0])
    const dispatch = useDispatch()

    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, task.id, newTitle))
    }
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, task.id, event.currentTarget.checked))
    }
    const removeTask = () => {
        dispatch(removeTaskItemAC(props.todolistId, task.id))
    }
    return (
        <div className={task.isDone ? s.activeTask : ''}>
            <Button name={'X'}
                    callback={removeTask}/>
            <input type="checkbox" onChange={changeTaskStatus}
                   checked={task.isDone}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        </div>
    );
};
