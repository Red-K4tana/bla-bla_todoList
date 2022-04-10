import {TodolistsType, FilterValuesType} from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE-Todolist'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-Todolist'
    title: string
    id: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-Todolist-TITLE'
    title: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-Todolist-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const RemoveTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-Todolist' as const, id: todolistID}
}
export const AddTodolistAC = (todolistID: string, newTitle: string) => {
    return {type: 'ADD-Todolist' as const, title: newTitle, id: todolistID}
}
export const ChangeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {type: 'CHANGE-Todolist-TITLE' as const, title: newTitle, id: todolistID}
}
export const ChangeTodolistFilterAC = (todolistID: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-Todolist-FILTER' as const, filter: newFilter, id: todolistID}
}

const initialTodolists: Array<TodolistsType> = []

export const todolistsReducer = (todolists = initialTodolists, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-Todolist':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-Todolist':
            return [...todolists, {id: action.id, title: action.title, filter: 'All'}]
        case 'CHANGE-Todolist-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-Todolist-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}