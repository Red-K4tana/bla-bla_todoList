import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { AppWithRedux } from './AppWithRedux';
import {Provider} from "react-redux";
import {rootStore} from "./Redux/store";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <Provider store={rootStore}>
        <BrowserRouter>
            <AppWithRedux/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
