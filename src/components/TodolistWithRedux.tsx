import React, {useCallback, useEffect} from "react";
import {FilterValuesType} from "../AppWithRedux";
import {Button} from "./Button";
import s from "./Input.module.css";
import tl from '../Todolist.module.css'
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

type TodolistPropsType = {
    todolistID: string
}

export const TodolistWithRedux = React.memo((props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistDomainType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);


    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getTasksTC(props.todolistID))
    }, [])

    // ====================================
    console.log('TodolistWithRedux ', props.todolistID)
    // ====================================

    const tsarChangeFilter = useCallback( (filter: FilterValuesType) => { //кнопки фильтра
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [todolist.id])
    const changeTodolistTitle = useCallback( (newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, newTitle))
    }, [todolist.id])
    const removeTodolist = useCallback( (todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])
    const addTask = useCallback( (newTitle: string) => {
        dispatch(addTaskTC(todolist.id, newTitle))
    }, [todolist.id])
    //-------------------------------------------------------------------------------------------
    let tasksAfterFilter = tasks;
    if (todolist.filter === 'Active') {
        tasksAfterFilter = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (todolist.filter === 'Completed') {
        tasksAfterFilter = tasks.filter(task => task.status  === TaskStatuses.Completed)
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
            <div className={tl.todolist}>

                <div className={tl.titleTodolist}>
                    <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
                    <Button name={'RemoveTL'} callback={() => removeTodolist(todolist.id)}/>
                </div>
                <div>
                    <AddItemForm name={'Add Task'} addItem={addTask}/>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <Button color={todolist.filter === 'All' ? s.activeFilter : ''} name={'All'}
                            callback={() => tsarChangeFilter('All')}/>
                    <Button color={todolist.filter === 'Active' ? s.activeFilter : ''} name={'Active'}
                            callback={() => tsarChangeFilter('Active')}/>
                    <Button color={todolist.filter === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                            callback={() => tsarChangeFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
})

