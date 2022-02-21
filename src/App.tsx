import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import {News} from "./components/News/News";
import {SelectedNews} from "./components/SelectedNews/SelectedNews";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";

function App() {

    return (
        <div className="App">
            <Switch>
                <Route path='/news/1'>
                    <SelectedNews/>
                </Route>
                <Route exact path='/news'>
                    <News/>
                </Route>
                <Route exact path='/'>
                    <Redirect to='/news'/>
                </Route>
                <Route path='*'>
                    <ErrorPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
