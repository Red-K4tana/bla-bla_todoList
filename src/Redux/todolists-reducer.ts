import {FilterValuesType} from '../AppWithRedux';
import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    id: string
    entityStatus: RequestStatusType
}
export type GetTodolistActionType = ReturnType<typeof getTodolistsAC>

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodolistActionType
    | ChangeTodolistEntityStatusActionType

//ACTION CREATORS ====================================================================================== ACTION CREATORS
export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST' as const, id: todolistID}
}
export const addTodolistAC = (todolistID: string, newTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST' as const, title: newTitle, id: todolistID}
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, title: newTitle, id: todolistID}
}
export const changeTodolistFilterAC = (todolistID: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, filter: newFilter, id: todolistID}
}
export const getTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'GET-TODOLISTS', todolists} as const
}
export const changeTodolistEntityStatusAC = (todolistID: string, entityStatus: RequestStatusType): ChangeTodolistEntityStatusActionType => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: todolistID, entityStatus: entityStatus} as const
}

//THUNK CREATORS ======================================================================================== THUNK CREATORS
export const getTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item.id, res.data.data.item.title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages[0]) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }

        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistID, 'loading'))
    todolistAPI.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC(todolistID))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTodolistEntityStatusAC(todolistID, 'idle'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const changeTodolistTitleTC = (todolistID: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistID, newTitle)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistID, newTitle))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}

//добавляем к типам тудулистов с сервера фильтры
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialTodolists: Array<TodolistDomainType> = []

//TODOLIST-REDUCER ==================================================================================== TODOLIST-REDUCER
export const todolistsReducer = (todolists = initialTodolists, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'GET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}))
        }
        case 'REMOVE-TODOLIST': {
            return todolists.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.id, title: action.title, filter: 'All', addedDate: '', order: 0, entityStatus: 'idle'}, ...todolists]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return todolists.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return todolists
    }
}

