import {v1} from 'uuid'
import {TasksStateType} from "../App";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";

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
    const newTaskTitle = 'New Task'

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
    const endState = tasksReducer(startState, addTaskItemAC(todolistID_2, newTaskTitle))

    expect(endState[todolistID_2].length).toBe(3)
    expect(endState[todolistID_2][2].title).toBe(newTaskTitle)
})
test('correct task should be change its title', ()=> {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const newTaskTitle = 'New Task'

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
    const endState = tasksReducer(startState, changeTaskTitleAC(todolistID_2, startState[todolistID_2][0].id, newTaskTitle))

    expect(endState[todolistID_2][0].title).toBe(newTaskTitle)
    expect(endState[todolistID_2][1].title).toBe('MEAT')
})
test('correct task should be change its status', ()=> {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const newIsDone = true

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
    const endState = tasksReducer(startState, changeTaskStatusAC(todolistID_1, startState[todolistID_1][1].id, newIsDone))

    expect(endState[todolistID_1][1].isDone).toBe(true)
    expect(endState[todolistID_1][1].title).toBe('JS')
    expect(endState[todolistID_1][0].isDone).toBe(false)
    expect(endState[todolistID_2][0].isDone).toBe(false)
    expect(endState[todolistID_2][1].isDone).toBe(false)
})
test('new array should be added when new todolist is added', ()=> {
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
    const action = AddTodolistAC('New Todolist')
    const endState: TasksStateType = tasksReducer(startState, action)

    const newKey = Object.keys(endState).find(k => k !== 'todolistID_1' && k !== 'todolistID_2')
    if (!newKey) throw new Error('The required key is missing!')

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(action.id)
    expect(endState[newKey]).toEqual([])

})





















