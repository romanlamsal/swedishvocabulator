import React from 'react';
import logo from './logo.svg';
import './App.css';
import Lecture from "./components/LectureEdit";
import {Provider} from "react-redux";
import {createStore} from "redux";
import lectureReducer from "./domain/lectureReducer";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import LectureOverview from "./components/LectureOverview";
import YesNoQuiz from "./components/YesNoQuiz";

function App() {

    return (
        <Provider className="App" store={createStore(lectureReducer)}>
            <BrowserRouter>
                <Switch>
                    <Route path={"/lecture/:lectureId?"} component={Lecture}/>
                    <Route path={"/quiz/yesno/:lectureId"} component={YesNoQuiz}/>
                    <Route path={"/"} component={LectureOverview}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
