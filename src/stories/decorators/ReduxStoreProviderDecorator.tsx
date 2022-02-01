import React from 'react';
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../reducer/tasks-reducer";
import {todolistReducer} from "../../reducer/todolist-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../../store";
import {Provider} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
});

export const todolistId_1 = v1()
export const todolistId_2 = v1()

export const taskId_2_2 = v1()

const initialGlobalState = {
    todolists: [
        {id: todolistId_1, title: 'Should be learning', filter: 'All'},
        {id: todolistId_2, title: 'Should be buy', filter: 'All'},
    ],
    tasks: {
        [todolistId_1]: [
            {id: v1(), title: 'react', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'bread', isDone: false},
            {id: taskId_2_2, title: 'milk', isDone: true},
        ],
    },
};
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};