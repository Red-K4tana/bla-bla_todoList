import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistAC,} from "./reducer/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TodolistWithRedux} from "./TodolistWithRedux";


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
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state)=> state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state)=> state.tasks)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const action = addTodolistAC(title, todolistID)
        dispatch(action)
    }
    //---------------------------------------------------------------------------------
    const todolistsComp = todolists.map(tl => {

        return (
            <div className="App"
                 key={tl.id}
            >
                <TodolistWithRedux
                    todolistId={tl.id}
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



