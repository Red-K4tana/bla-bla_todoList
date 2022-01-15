import {v1} from "uuid";
import {TodolistsType, FilterValuesType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: Array<TodolistsType> = [
        {id: todolistID_1, title: 'What to learn', filter: 'All'},
        {id: todolistID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const endState = todolistReducer(startState, {type: 'REMOVE-Todolist', id: todolistID_1})*/
    const endState = todolistReducer(startState, removeTodolistAC(startState[0].id))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID_2)

})
test('correct todolist should be added', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistID_1, title: 'What to learn', filter: 'All'},
        {id: todolistID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const endState = todolistReducer(startState, {type: 'ADD-Todolist', title: newTodolistTitle})*/
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const newTodolistTitle = 'Change name todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistID_1, title: 'What to learn', filter: 'All'},
        {id: todolistID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const action = {
        type: 'CHANGE-Todolist-TITLE' as const,
        title: newTodolistTitle,
        id: todolistID_2
    }*/

    const endState = todolistReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistID_2))

    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('What to learn')
})
test('correct todolist should change its filter', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const newTodolistFilter: FilterValuesType = 'Active'

    const startState: Array<TodolistsType> = [
        {id: todolistID_1, title: 'What to learn', filter: 'All'},
        {id: todolistID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const action = {
        type: 'CHANGE-Todolist-FILTER' as const,
        filter: newTodolistFilter,
        id: todolistID_2
    }*/

    const endState = todolistReducer(startState, changeTodolistFilterAC(newTodolistFilter, todolistID_2))

    expect(endState[1].filter).toBe(newTodolistFilter)
    expect(endState[0].filter).toBe('All')
})
