import {TodoListsType, FilterValuesType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST' as const, id: todoListID}
}
export const addTodoListAC = (newTitle: string, todoListID: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST' as const, title: newTitle, id: todoListID}
}
export const changeTodoListTitleAC = (newTitle: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, title: newTitle, id: todoListID}
}
export const changeTodoListFilterAC = (newFilter: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, filter: newFilter, id: todoListID}
}

export const todoListReducer = (todoLists: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            console.log(action.id + 'remove todolist (in TL)')
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            /*const newTodoList: TodoListsType = {
                id: action.id,
                title: action.title,
                filter: 'All'
            }*/
            console.log(action.id + 'add todolist (in TL)')
            return [...todoLists, {id: action.id, title: action.title, filter: 'All'}]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error('Incorrect type!')
    }
}