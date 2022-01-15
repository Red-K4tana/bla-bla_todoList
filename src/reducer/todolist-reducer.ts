import {FilterValuesType, TodolistsType} from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST' as const, id: todolistID}
}
export const addTodolistAC = (newTitle: string, todolistID: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST' as const, title: newTitle, id: todolistID}
}
export const changeTodolistTitleAC = (newTitle: string, todolistID: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, title: newTitle, id: todolistID}
}
export const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, filter: newFilter, id: todolistID}
}

let initialTodolistsState: Array<TodolistsType> = []
export const todolistReducer = (todolists = initialTodolistsState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...todolists, {id: action.id, title: action.title, filter: 'All'}]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}