import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

import {AddItemForm} from "./components/AddItemForm";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC,} from "./reducer/tasks-reducer";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,} from "./reducer/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";


export type FilterValuesType = 'All' | 'Active' | 'Completed' | 'X'
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TasksStateType = {
    [todolistID: string]: Array<TasksType>,
}
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export const AppWithRedux = () => {
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>((todolists)=> todolists.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>((tasks)=> tasks.tasks)
    const dispatch = useDispatch()

    const removeTaskItem = (todolistID: string, taskID: string) => {
        dispatch(removeTaskItemAC(todolistID, taskID))
    }
    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskItemAC(todolistID, title))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        const action = addTodolistAC(title, todolistID)
        dispatch(action)
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(title, todolistID))
    }
    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(filter, todolistID))
    }
    //---------------------------------------------------------------------------------
    const todolistsComp = todolists.map((tl: any) => {
        let tasksForRender = tasks[tl.id]
        if (tl.filter === 'Active') {
            tasksForRender = tasksForRender.filter(t => !t.isDone)
        }
        if (tl.filter === "Completed") {
            tasksForRender = tasksForRender.filter(t => t.isDone)
        }
        return (
            <div className="App">
                <Todolist
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.title}
                    tasks={tasksForRender}
                    removeTaskItem={removeTaskItem}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                />
            </div>
        )
    })
    //-------------------------------------------------------------------------------
    return (
        <div className={'todolist'}>
            {todolistsComp}
            <div className={'add-tl'}>
                <AddItemForm name={'AddTL'} addItem={addTodolist}/>
            </div>
        </div>
    )
}



