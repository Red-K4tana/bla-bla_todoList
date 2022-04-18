import React, {useCallback, useEffect} from "react";
import {FilterValuesType} from "../AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistDomainType
} from "../Redux/todolists-reducer";
import {addTaskTC, getTasksTC} from "../Redux/tasks-reducer";
import {AppRootStateType} from "../Redux/store";
import {Task} from "./task";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Button from '@mui/material/Button';

type TodolistPropsType = {
    todolistID: string
}

export const TodolistWithRedux = React.memo((props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistDomainType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksTC(props.todolistID))
    }, [])

    // ====================================
    console.log('TodolistWithRedux ', props.todolistID)
    // ====================================

    const tsarChangeFilter = useCallback((filter: FilterValuesType) => { //кнопки фильтра
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [todolist.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, newTitle))
    }, [todolist.id])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])
    const addTask = useCallback((newTitle: string) => {
        dispatch(addTaskTC(todolist.id, newTitle))
    }, [todolist.id])
    //-------------------------------------------------------------------------------------------
    let tasksAfterFilter = tasks;
    if (todolist.filter === 'Active') {
        tasksAfterFilter = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (todolist.filter === 'Completed') {
        tasksAfterFilter = tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    //-------------------------------------------------------------------------------------------
    const tasksJSX = tasksAfterFilter.map(task => {
            return (
                <Task key={task.id} todolistID={todolist.id} taskID={task.id}/>
            )
        }
    )
    //-------------------------------------------------------------------------------------------

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>

                <IconButton color="secondary" onClick={()=>removeTodolist(todolist.id)}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm name={'Add Task'} addItem={addTask}/>
            <div>
                {tasksJSX}
            </div>
            <div>
                <Button variant={todolist.filter === 'All'  ? 'outlined' : 'text'} onClick={()=>tsarChangeFilter('All')}>
                    All
                </Button>
                <Button variant={todolist.filter === 'Active' ? 'outlined' : 'text'} onClick={()=>tsarChangeFilter('Active')}>
                    Active
                </Button>
                <Button variant={todolist.filter === 'Completed' ? 'outlined' : 'text'} onClick={()=>tsarChangeFilter('Completed')}>
                    Completed
                </Button>
            </div>
        </div>)
})

