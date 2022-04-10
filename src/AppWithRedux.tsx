import React from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";
import {
    AddTodolistAC,
} from "./Redux/todolists-reducer";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = 'All' | 'Active' | 'Completed' | 'X'
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistID: string]: Array<TasksType>
}

export const AppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const todolistID = v1()
        dispatch(AddTodolistAC(todolistID, title))
    }
    //---------------------------------------------------------------------------------
    const todolistsComp = todolists.map(tl => {

        return (
            <div className="App">
                <TodolistWithRedux
                    key={tl.id}
                    todolistID={tl.id}
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


