import {FilterValuesType} from '../AppWithRedux';
import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolist-api";

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
export type GetTodolistActionType = ReturnType<typeof getTodolistsAC>

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodolistActionType

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

//THUNK CREATORS ======================================================================================== THUNK CREATORS
export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item.id, res.data.data.item.title))
        })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC(todolistID))
        })
}
export const changeTodolistTitleTC = (todolistID: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistID, newTitle)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistID, newTitle))
        })
}

//добавляем к типам тудулистов с сервера фильтры
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialTodolists: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

//TODOLIST-REDUCER ==================================================================================== TODOLIST-REDUCER
export const todolistsReducer = (todolists = initialTodolists, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'GET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'All'}))
        }
        case 'REMOVE-TODOLIST': {
            return todolists.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.id, title: action.title, filter: 'All', addedDate: '', order: 0}, ...todolists]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return todolists
    }
}

