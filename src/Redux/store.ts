import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export const rootStore = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>