import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = 'All' | 'Active' | 'Completed' | 'X'
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistID: string]: Array<TasksType>
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'All'},
        {id: todolistID_2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID_1]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "React", isDone: false},
            ],
            [todolistID_2]: [
                {id: v1(), title: "MILK", isDone: false},
                {id: v1(), title: "MEAT", isDone: false},
                {id: v1(), title: "BEER", isDone: false},
            ]
        }
    )
    const removeTaskItem = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }
    const addTask = (todolistID: string, title: string) => {
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], {id: v1(), title, isDone: false}]})
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t=> t.id === taskID ? {...t, title} : t)})
    }
    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        setTodolists([...todolists, {id: todolistID, title, filter: 'All'}])
        setTasks({...tasks, [todolistID]: []})
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }
    //---------------------------------------------------------------------------------
    const todolistsComp = todolists.map(tl => {
        let tasksForRender = tasks[tl.id]
        if (tl.filter === 'Active') {
            tasksForRender = tasksForRender.filter(t => !t.isDone)
        }
        if (tl.filter === "Completed") {
            tasksForRender = tasksForRender.filter(t => t.isDone)
        }
        return (
            <div className="App">
                <Todolist
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.title}
                    tasks={tasksForRender}
                    removeTaskItem={removeTaskItem}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                />
            </div>
        )
    })
    //-------------------------------------------------------------------------------
    return (
        <div className={'todolist'}>
            {todolistsComp}
            <div className={'add-tl'}>
                <AddItemForm name={'AddTL'} addItem={addTodolist}/>
            </div>
        </div>
    )
}

export default App;

