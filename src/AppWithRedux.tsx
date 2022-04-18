import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";
import {addTodolistTC, getTodolistTC, TodolistDomainType,} from "./Redux/todolists-reducer";
import {TaskType} from "./api/todolist-api";
import {TodolistWithRedux} from "./components/TodolistWithRedux";
import l from './loadingCubes.module.css'
import {RequestStatusType} from "./Redux/app-reducer";

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

export const AppWithRedux = React.memo (() => {
    useEffect(()=> {
        dispatch(getTodolistTC())
    }, [])

    // ====================================
    console.log('AppWithRedux ')
    // ====================================

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    const addTodolist = useCallback( (title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
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
            {status === 'loading' && <div className={l.cssloadthecube}>
                <div className={l.cssloadcube + ' ' + l.cssloadc1}></div>
                <div className={l.cssloadcube + ' ' + l.cssloadc2}></div>
                <div className={l.cssloadcube + ' ' + l.cssloadc4}></div>
                <div className={l.cssloadcube + ' ' + l.cssloadc3}></div>
            </div>}
            <div className={'add-tl'}>
                <AddItemForm name={'AddTL'} addItem={addTodolist}/>
            </div>
            {todolistsComp}
        </div>
    )
})


