import {v1} from 'uuid'
import {TasksStateType, TodoListsType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, todoListReducer} from "./todoList-reducer";

test('ids should be equals', ()=> {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListsType> = [];

    const action = addTodoListAC('New Title')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    expect(Object.keys(endTasksState).length).toBe(1)
    expect(endTodoListsState.length).toBe(1)

    expect(endTodoListsState[0].id).toBe(action.id)
    expect(Object.keys(endTasksState)[0]).toBe(action.id)
})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todoListID_1': [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        'todoListID_2': [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTodoListAC('todoListID_1'))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe('todoListID_2')
})