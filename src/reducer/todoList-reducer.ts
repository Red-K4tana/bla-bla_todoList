import {TodoListsType, FilterValuesType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

export const RemoveTodoListAC = (todoListID: string) => {
    return {type: 'REMOVE-TODOLIST' as const, id: todoListID}
}
export const AddTodoListAC = (newTitle: string) => {
    return {type: 'ADD-TODOLIST' as const, title: newTitle}
}
export const ChangeTodoListTitleAC = (newTitle: string, todoListID: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, title: newTitle, id: todoListID}
}
export const ChangeTodoListFilterAC = (newFilter: string, todoListID: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, filter: newFilter, id: todoListID}
}

export const todoListReducer = (todoLists: Array<TodoListsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListsType = {
                id: v1(),
                title: action.title,
                filter: 'All'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error('Incorrect type!')
    }
}