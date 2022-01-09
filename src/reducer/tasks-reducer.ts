import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoList-reducer";

type RemoveTaskItemActionType = {
    type: 'REMOVE-TASK-ITEM'
    todoListID: string
    taskID: string
}
type AddTaskItemActionType = {
    type: 'ADD-TASK-ITEM'
    todoListID: string
    newTitle: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListID: string
    taskID: string
    newTitle: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListID: string
    taskID: string
    newIsDone: boolean
}
type ActionType =
    RemoveTaskItemActionType
    | AddTaskItemActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const removeTaskItemAC = (todoListID: string, taskID: string)=> {
    return {type: "REMOVE-TASK-ITEM" as const, todoListID: todoListID, taskID: taskID}
}
export const addTaskItemAC = (todoListID: string, newTitle: string)=> {
    return {type: "ADD-TASK-ITEM" as const, todoListID: todoListID, newTitle: newTitle}
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string)=> {
    return {type: 'CHANGE-TASK-TITLE' as const, todoListID: todoListID, taskID: taskID, newTitle: newTitle}
}
export const changeTaskStatusAC = (todoListID: string, taskID: string, newIsDone: boolean)=> {
    return {type: 'CHANGE-TASK-STATUS' as const, todoListID: todoListID, taskID: taskID, newIsDone: newIsDone}
}

export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK-ITEM':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK-ITEM':
            const newTask = {
                id: v1(),
                title: action.newTitle,
                isDone: false
            }
            return {...tasks, [action.todoListID]: [...tasks[action.todoListID], newTask]}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.newIsDone} : t)}
        case 'ADD-TODOLIST':
            console.log(action.id + 'add todolist (in tasks)')
            return {...tasks, [action.id]: []}
        case 'REMOVE-TODOLIST':
            let copyTasks = {...tasks}
            delete copyTasks[action.id]
            console.log(action.id + 'remove todolist (in tasks)')
            return copyTasks
        default:
            return tasks
    }
}