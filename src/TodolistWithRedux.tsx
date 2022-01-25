import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from "./components/Input.module.css";
import tl from './Todolist.module.css'
import {TasksType} from "./AppWithRedux";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TodolistsType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducer/todolist-reducer";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC} from "./reducer/tasks-reducer";
import {TaskItem} from "./components/TaskItem";

type TodolistPropsType = {
    todolistId: string
}

export const TodolistWithRedux = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistsType>(state => state.todolists
        .filter(tl => tl.id === props.todolistId)[0])
    const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskItemAC(todolist.id, title))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolist.id))
    }
    //-------------------------------------------------------------------------------------------
    let tasksForRender = tasks;
    if (todolist.filter === 'Active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === "Completed") {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    const taskJSX = tasksForRender.map(task =>
        {

            return (
                <li key={task.id} className={task.isDone ? s.activeTask : ''}>
                    <TaskItem todolistId={todolist.id} taskId={task.id} />
                </li>
            )
        }
    )
    //-------------------------------------------------------------------------------------------
    return (
        <div>
            <div>
                <div className={tl.titleTodolist}>
                    <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
                    <Button name={'RemoveTL'} callback={() => dispatch(removeTodolistAC(todolist.id))}/>
                </div>
                <div>
                    <AddItemForm name={'Add Task'} addItem={addTask}/>
                </div>
                <ul>
                    {taskJSX}
                </ul>
                <div>
                    <Button color={todolist.filter === 'All' ? s.activeFilter : ''} name={'All'}
                            callback={() => dispatch(changeTodolistFilterAC('All', todolist.id))}/>
                    <Button color={todolist.filter === 'Active' ? s.activeFilter : ''} name={'Active'}
                            callback={() => dispatch(changeTodolistFilterAC('Active', todolist.id))}/>
                    <Button color={todolist.filter === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                            callback={() => dispatch(changeTodolistFilterAC('Completed', todolist.id))}/>
                </div>
            </div>
        </div>
    )
}
