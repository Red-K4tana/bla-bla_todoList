import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskItemActionType = {
    type: 'REMOVE-TASK-ITEM'
    todolistID: string
    taskID: string
}
type AddTaskItemActionType = {
    type: 'ADD-TASK-ITEM'
    todolistID: string
    newTitle: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskID: string
    newTitle: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    newIsDone: boolean
}
type ActionType =
    RemoveTaskItemActionType
    | AddTaskItemActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | RemoveTodolistActionType
    | AddTodolistActionType

export const removeTaskItemAC = (todolistID: string, taskID: string)=> {
    return {type: "REMOVE-TASK-ITEM" as const, todolistID: todolistID, taskID: taskID}
}
export const addTaskItemAC = (todolistID: string, newTitle: string)=> {
    return {type: "ADD-TASK-ITEM" as const, todolistID: todolistID, newTitle: newTitle}
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string)=> {
    return {type: 'CHANGE-TASK-TITLE' as const, todolistID: todolistID, taskID: taskID, newTitle: newTitle}
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, newIsDone: boolean)=> {
    return {type: 'CHANGE-TASK-STATUS' as const, todolistID: todolistID, taskID: taskID, newIsDone: newIsDone}
}

const initialTasks: TasksStateType = {}

export const tasksReducer = (tasks = initialTasks, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK-ITEM':
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK-ITEM':
            const newTask = {
                id: v1(),
                title: action.newTitle,
                isDone: false
            }
            return {...tasks, [action.todolistID]: [...tasks[action.todolistID], newTask]}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, isDone: action.newIsDone} : t)}
        case 'REMOVE-Todolist':
            const copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        case 'ADD-Todolist':
            return {...tasks, [action.id]: []}
        default:
            return tasks
    }
}