import React, {useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";
import {addTodolistTC, getTodolistTC, TodolistDomainType,} from "./Redux/todolists-reducer";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {TaskType} from "./api/todolist-api";

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
    [todolistID: string]: Array<TaskType>
}

export const AppWithRedux = () => {
    useEffect(()=> {
        dispatch(getTodolistTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
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
            <div className={'add-tl'}>
                <AddItemForm name={'AddTL'} addItem={addTodolist}/>
            </div>
            {todolistsComp}
        </div>
    )
}


