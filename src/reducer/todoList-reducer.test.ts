import {v1} from "uuid";
import {TodoListsType, FilterValuesType} from "../App";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./todoList-reducer";

test('correct todolist should be removed', () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const endState = todoListReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListID_1})*/
    const endState = todoListReducer(startState, RemoveTodoListAC(startState[0].id))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)

})
test('correct todolist should be added', () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const newTodoListTitle = 'New Todolist'

    const startState: Array<TodoListsType> = [
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const endState = todoListReducer(startState, {type: 'ADD-TODOLIST', title: newTodoListTitle})*/
    const endState = todoListReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})
test('correct todolist should change its name', () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const newTodoListTitle = 'Change name todolist'

    const startState: Array<TodoListsType> = [
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        title: newTodoListTitle,
        id: todoListID_2
    }*/

    const endState = todoListReducer(startState, ChangeTodoListTitleAC(newTodoListTitle, todoListID_2))

    expect(endState[1].title).toBe(newTodoListTitle)
    expect(endState[0].title).toBe('What to learn')
})
test('correct todolist should change its filter', () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const newTodoListFilter: FilterValuesType = 'Active'

    const startState: Array<TodoListsType> = [
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ]

    /*const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        filter: newTodoListFilter,
        id: todoListID_2
    }*/

    const endState = todoListReducer(startState, ChangeTodoListFilterAC(newTodoListFilter, todoListID_2))

    expect(endState[1].filter).toBe(newTodoListFilter)
    expect(endState[0].filter).toBe('All')
})

