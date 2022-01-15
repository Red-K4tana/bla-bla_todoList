import {v1} from 'uuid'
import {TasksStateType, TodolistsType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";

test('ids should be equals', ()=> {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = addTodolistAC('New Title')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    expect(Object.keys(endTasksState).length).toBe(1)
    expect(endTodolistsState.length).toBe(1)

    expect(endTodolistsState[0].id).toBe(action.id)
    expect(Object.keys(endTasksState)[0]).toBe(action.id)
})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistID_1': [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        'todolistID_2': [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTodolistAC('todolistID_1'))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe('todolistID_2')
})