import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./components/Input.module.css";
import tl from './TodoList.module.css'
import {TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TasksType>
    removeTaskItem: (todoListID: string, itemId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, itemId: string, value: boolean) => void
    filter: string
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    changeTaskTitle: (todoListID: string, itemId: string, title: string)=> void
}

export const Todolist = (props: TodolistPropsType) => {

    const tsarChangeFilter = (event: FilterValuesType) => { //кнопки фильтра
        props.changeFilter(props.todoListID, event)
    }
    const onChangeStatusHandler = (itemId: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListID, itemId, event.currentTarget.checked)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    }
    //-------------------------------------------------------------------------------------------
    const taskJSX = props.tasks.map(m => {
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(props.todoListID, m.id, newTitle)
        }
            return (
                <li key={m.id} className={m.isDone ? s.activeTask : ''}>
                    <Button name={'X'}
                            callback={() => props.removeTaskItem(props.todoListID, m.id)}/>
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
                <div className={tl.titleTodoList}>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <Button name={'RemoveTL'} callback={() => props.removeTodoList(props.todoListID)}/>
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

