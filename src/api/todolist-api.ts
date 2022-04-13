import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9bad4dc1-4f5c-485a-93a2-c73a0c7180c8'
    }
})

// API
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        //{title: string} !?!?
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TodolistType}>>>('todo-lists', {title});
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`);
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(`todo-lists/${todolistID}`, {title});
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`);
    },
    createTask(todolistID: string, title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistID}/tasks`, {title});
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`);
    },
    updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistID}/tasks/${taskID}`, model);
    },
}

//TYPE
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
    fieldsError: Array<string>
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}