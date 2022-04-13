import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";

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
type GetTasksActionCreator = ReturnType<typeof getTasksTC>

type ActionType =
    RemoveTaskItemActionType
    | AddTaskItemActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | GetTasksActionCreator

//ACTION CREATORS ==================================================================================================
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

//THUNK CREATORS ==================================================================================================
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistID)
        .then(res => {
            dispatch(getTasksAC(todolistID, res.data.items))
        })
}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(removeTaskItemAC(todolistID, taskID))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            dispatch(addTaskItemAC(res.data.data.item))
        })
}
export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses) => (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
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
            })
    }
}
export const changeTaskTitleTC = (task: TaskType, newTitle: string) => (dispatch: Dispatch) => {
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
        })
}


const initialTasks: TasksStateType = {}

export const tasksReducer = (tasks = initialTasks, action: ActionType): TasksStateType => {
    // switch (action.type) {
    //     case 'REMOVE-TASK-ITEM':
    //         return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(t => t.id !== action.taskID)}
    //     case 'ADD-TASK-ITEM':
    //         const newTask = {
    //             id: v1(),
    //             title: action.newTitle,
    //             isDone: false
    //         }
    //         return {...tasks, [action.todolistID]: [...tasks[action.todolistID], newTask]}
    //     case 'CHANGE-TASK-TITLE':
    //         return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
    //     case 'CHANGE-TASK-STATUS':
    //         return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, isDone: action.newIsDone} : t)}
    //     case 'REMOVE-Todolist':
    //         const copyTasks = {...tasks}
    //         delete copyTasks[action.id]
    //         return copyTasks
    //     case 'ADD-Todolist':
    //         return {...tasks, [action.id]: []}
    //     default:
    //         return tasks
    // }
}