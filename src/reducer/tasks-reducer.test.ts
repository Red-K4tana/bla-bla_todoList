import {v1} from 'uuid'
import {TasksStateType} from "../App";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC} from "./todolist-reducer";

test('correct task should be removed', ()=> {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: TasksStateType = {
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, removeTaskItemAC(todolistID_2, startState[todolistID_2][0].id))
    /*const endState = tasksReducer(startState, {type: "REMOVE-TASK-ITEM", todolistID: todolistID_2, taskID: startState[todolistID_2][0].id})*/

    expect(endState[todolistID_2].length).toBe(1)
    expect(endState[todolistID_2][0].title).toBe('MEAT')
})
test('correct task should be added', ()=> {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: TasksStateType = {
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, addTaskItemAC(todolistID_2, 'New Task'))

    expect(endState[todolistID_2].length).toBe(3)
    expect(endState[todolistID_2][2].title).toBe('New Task')
})
test('correct task should be change its title', ()=> {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: TasksStateType = {
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, changeTaskTitleAC(todolistID_2, startState[todolistID_2][0].id, 'New Task'))

    expect(endState[todolistID_2][0].title).toBe('New Task')
    expect(endState[todolistID_2][1].title).toBe('MEAT')
})
test('correct task should be change its status', ()=> {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: TasksStateType = {
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, changeTaskStatusAC(todolistID_1, startState[todolistID_1][1].id, true))

    expect(endState[todolistID_1][1].isDone).toBe(true)
    expect(endState[todolistID_1][1].title).toBe('JS')
    expect(endState[todolistID_1][0].isDone).toBe(false)
    expect(endState[todolistID_2][0].isDone).toBe(false)
    expect(endState[todolistID_2][1].isDone).toBe(false)

})
test('new array should be added when new todolist is added', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: TasksStateType = {
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const todolistID = v1()
    const endState: TasksStateType = tasksReducer(startState, addTodolistAC('New Title', todolistID))
    const newKey = Object.keys(endState).find(k => k !== todolistID_1 && k !== todolistID_2)

    if(!newKey) {
        throw Error ('new key don`t added')
    }

    expect(Object.keys(endState).length).toBe(3)
    expect(newKey).toBe(todolistID)
    expect(endState[newKey]).toEqual([])
})