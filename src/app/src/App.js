import React from 'react';
import './App.css';
import Lecture from "./components/LectureEdit";
import {Provider} from "react-redux";
import {createStore} from "redux";
import lectureReducer from "./domain/lectureReducer";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import LectureOverview from "./components/LectureOverview";
import YesNoQuiz from "./components/quiz/YesNoQuiz";

function App() {

    return (
        <Provider className="App" store={createStore(lectureReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
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
