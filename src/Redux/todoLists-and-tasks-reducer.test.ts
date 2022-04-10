import {TasksStateType, TodolistsType} from "../App";
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', ()=> {
    const startTasksState: TasksStateType = {}
    const startTodolistState: Array<TodolistsType> = []

    const todolistId = v1();
    const action = AddTodolistAC(todolistId,'New Todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    expect(Object.keys(endTasksState)[0]).toBe(todolistId)
    expect(endTodolistState[0].id).toBe(todolistId)
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

    const action = RemoveTodolistAC('todolistID_1')
    const endState: TasksStateType = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe('todolistID_2')
    expect(endState['todolistID_1']).toBeUndefined()
})