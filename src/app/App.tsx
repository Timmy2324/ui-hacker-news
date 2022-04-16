import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import {SelectedNews} from "../components/SelectedNews/SelectedNews";
import {ErrorPage} from "../components/ErrorPage/ErrorPage";
import {Container} from "@mui/material";
import {AllNews} from "../components/AllNews/AllNews";

function App() {
    return (
        <div className="App">
            <Container>
                <Switch>
                    <Route path='/news/:newsId'>
                        <SelectedNews/>
                    </Route>
                    <Route path='/news'>
                        <AllNews/>
                    </Route>
                    <Route exact path='/'>
                        <Redirect to='/news'/>
                    </Route>
                    <Route path='*'>
                        <ErrorPage/>
                    </Route>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
