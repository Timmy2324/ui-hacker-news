import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import {SelectedNews} from "./components/SelectedNews/SelectedNews";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";
import {NewsContainer} from "./components/News/NewsContainer";

function App() {

    return (
        <div className="App">
            <Switch>
                <Route path='/news/1'>
                    <SelectedNews/>
                </Route>
                <Route exact path='/news'>
                    <NewsContainer/>
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
