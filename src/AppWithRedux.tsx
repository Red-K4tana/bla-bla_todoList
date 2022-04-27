import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";
import {addTodolistTC, getTodolistTC, TodolistDomainType,} from "./Redux/todolists-reducer";
import {TaskType} from "./api/todolist-api";
import {TodolistWithRedux} from "./components/TodolistWithRedux";
import {RequestStatusType} from "./Redux/app-reducer";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/login";
import App from "./App";

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
    [todolistID: string]: Array<TaskType>
}

export const AppWithRedux = React.memo(() => {
    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])

    // ====================================
    console.log('AppWithRedux ')
    // ====================================

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    //---------------------------------------------------------------------------------
    const todolistsComp = todolists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <TodolistWithRedux
                    todolistID={tl.id}
                />
            </Grid>
        )
    })
    //-------------------------------------------------------------------------------
    return (
        <div className={'todolist'}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Link to={'login'}><Button color="inherit">Login</Button></Link>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path='/' element={
                        <Container fixed>
                            <Grid container style={{padding: '20px'}}>
                                <AddItemForm name={'AddTL'} addItem={addTodolist}/>
                            </Grid>
                            <Grid container spacing={3}>
                                {todolistsComp}
                            </Grid>
                        </Container>
                    }
                    />
                    <Route path='login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>

            <ErrorSnackbar/>
        </div>
    )
})


