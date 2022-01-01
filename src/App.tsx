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
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListID: string]: Array<TasksType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todoListID_1]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "React", isDone: false},
            ],
            [todoListID_2]: [
                {id: v1(), title: "MILK", isDone: false},
                {id: v1(), title: "MEAT", isDone: false},
                {id: v1(), title: "BEER", isDone: false},
            ]
        }
    )
    const removeTaskItem = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const addTask = (todoListID: string, title: string) => {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], {id: v1(), title, isDone: false}]})
    }
    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t=> t.id === taskID ? {...t, title} : t)})
    }
    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    }
    const addTodoList = (title: string) => {
        const todoListID = v1()
        setTodoLists([...todoLists, {id: todoListID, title, filter: 'All'}])
        setTasks({...tasks, [todoListID]: []})
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }
    //---------------------------------------------------------------------------------
    const todoListsComp = todoLists.map(tl => {
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
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForRender}
                    removeTaskItem={removeTaskItem}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}
                />
            </div>
        )
    })
    //-------------------------------------------------------------------------------
    return (
        <div className={'todoList'}>
            {todoListsComp}
            <div className={'add-tl'}>
                <AddItemForm name={'AddTL'} addItem={addTodoList}/>
            </div>
        </div>
    )
}

export default App;

