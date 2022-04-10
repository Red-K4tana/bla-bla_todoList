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
        //{title: string} возможно вначале
        return instance.post<AxiosResponse<ResponseType<{item: TodolistType}>>, {title: string}>('todo-lists', {title});
    }
}

//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    data: string
    messages: Array<string>
    resultCode: number
    fieldsError: Array<string>
}