import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from "./components/Input.module.css";
import tl from './Todolist.module.css'
import {TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./Redux/todolists-reducer";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC} from "./Redux/tasks-reducer";
import {AppRootStateType} from "./Redux/store";
import {TodolistsType} from "./AppWithRedux";
import {Task} from "./components/task";

type TodolistPropsType = {
    todolistID: string
}

export const TodolistWithRedux = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistsType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todolist.id]);
    const dispatch = useDispatch();

    const tsarChangeFilter = (filter: FilterValuesType) => { //кнопки фильтра
        dispatch(ChangeTodolistFilterAC(todolist.id, filter))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolist.id, newTitle))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID))
    }
    const addTask = (newTitle: string) => {
        dispatch(addTaskItemAC(todolist.id, newTitle))
    }
    //-------------------------------------------------------------------------------------------
    let tasksAfterFilter = tasks;
    if (todolist.filter === 'Active') {
        tasksAfterFilter = tasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'Completed') {
        tasksAfterFilter = tasks.filter(task => task.isDone)
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
            <div>
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
}

