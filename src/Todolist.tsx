import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./components/Input.module.css";
import tl from './Todolist.module.css'
import {TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    filter: string
    removeTaskItem: (todolistID: string, itemId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, itemId: string, value: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
    changeTaskTitle: (todolistID: string, itemId: string, title: string)=> void
}

export const Todolist = (props: TodolistPropsType) => {

    const tsarChangeFilter = (event: FilterValuesType) => { //кнопки фильтра
        props.changeFilter(props.todolistID, event)
    }
    const onChangeStatusHandler = (itemId: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID, itemId, event.currentTarget.checked)
    }
    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }
    //-------------------------------------------------------------------------------------------
    const taskJSX = props.tasks.map(m => {
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(props.todolistID, m.id, newTitle)
        }
            return (
                <li key={m.id} className={m.isDone ? s.activeTask : ''}>
                    <Button name={'X'}
                            callback={() => props.removeTaskItem(props.todolistID, m.id)}/>
                    <input type="checkbox" onChange={(event) => onChangeStatusHandler(m.id, event)}
                           checked={m.isDone}/>
                    <EditableSpan title={m.title} changeTitle={changeTaskTitle}/>
                </li>
            )
        }
    )
    //-------------------------------------------------------------------------------------------
    return (
        <div>
            <div>
                <div className={tl.titleTodolist}>
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <Button name={'RemoveTL'} callback={() => props.removeTodolist(props.todolistID)}/>
                </div>
                <div>
                    <AddItemForm name={'Add Task'} addItem={addTask}/>
                </div>
                <ul>
                    {taskJSX}
                </ul>
                <div>
                    <Button color={props.filter === 'All' ? s.activeFilter : ''} name={'All'}
                            callback={() => tsarChangeFilter('All')}/>
                    <Button color={props.filter === 'Active' ? s.activeFilter : ''} name={'Active'}
                            callback={() => tsarChangeFilter('Active')}/>
                    <Button color={props.filter === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                            callback={() => tsarChangeFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}

