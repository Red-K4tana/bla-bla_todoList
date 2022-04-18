import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, GetTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

type RemoveTaskItemActionType = {
    type: 'REMOVE-TASK-ITEM'
    todolistID: string
    taskID: string
}
type AddTaskItemActionType = {
    type: 'ADD-TASK-ITEM'
    task: TaskType
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
    status: TaskStatuses
}
type GetTasksActionCreator = ReturnType<typeof getTasksAC>

type ActionType =
    RemoveTaskItemActionType
    | AddTaskItemActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | GetTasksActionCreator
    | GetTodolistActionType


//ACTION CREATORS ====================================================================================== ACTION CREATORS
export const removeTaskItemAC = (todolistID: string, taskID: string): RemoveTaskItemActionType => {
    return {type: "REMOVE-TASK-ITEM" as const, todolistID: todolistID, taskID: taskID}
}
export const addTaskItemAC = (task: TaskType): AddTaskItemActionType => {
    return {type: "ADD-TASK-ITEM" as const, task}
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE' as const, todolistID: todolistID, taskID: taskID, newTitle: newTitle}
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS' as const, todolistID: todolistID, taskID: taskID, status: status}
}
export const getTasksAC = (todolistID: string, tasks: Array<TaskType>) => {
    return {type: 'GET-TASKS', todolistID, tasks} as const
}

//THUNK CREATORS ======================================================================================== THUNK CREATORS
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistID)
        .then(res => {
            dispatch(getTasksAC(todolistID, res.data.items))
            dispatch(setAppStatusAC('idle'))
        })
}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(removeTaskItemAC(todolistID, taskID))
            dispatch(setAppStatusAC('idle'))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskItemAC(res.data.data.item))
                dispatch(setAppStatusAC('idle'))
            } else {
                if (res.data.messages[0]) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}
export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses) => (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    //можно обойтись без getState изначально передавая в санку таску целиком
    const currentTask = getState().tasks[todolistID].find(t => t.id === taskID)
    //можно в запрос добавить всю таску, но лучше передать только необходимые данные
    if (currentTask) {
        const model: UpdateTaskModelType = {
            title: currentTask.title,
            description: currentTask.description,
            status: status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline,
        }
        todolistAPI.updateTask(todolistID, taskID, model)
            .then(res => {
                dispatch(changeTaskStatusAC(todolistID, taskID, status))
                dispatch(setAppStatusAC('idle'))
            })
    }
}
export const changeTaskTitleTC = (task: TaskType, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    //здесь обошлись без getState и передали сразу всю таску
    const model: UpdateTaskModelType = {
        title: newTitle,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }
    todolistAPI.updateTask(task.todoListId, task.id, model)
        .then(res => {
            dispatch(changeTaskTitleAC(task.todoListId, task.id, newTitle))
            dispatch(setAppStatusAC('idle'))
        })
}

const initialTasks: TasksStateType = {}

//TASKS REDUCER ========================================================================================== TASKS REDUCER
export const tasksReducer = (tasks = initialTasks, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'GET-TODOLISTS':
            const tasksCopy = {...tasks}
            action.todolists.forEach(tl => tasksCopy[tl.id] = [])
            return tasksCopy
        case 'GET-TASKS':
            return {...tasks, [action.todolistID]: action.tasks}
        case 'REMOVE-TASK-ITEM':
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK-ITEM':
            return {...tasks, [action.task.todoListId]: [action.task, ...tasks[action.task.todoListId]]}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.status} : t)}
        case 'REMOVE-TODOLIST':
            const copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        case 'ADD-TODOLIST':
            return {...tasks, [action.id]: []}
        default:
            return tasks
    }
}