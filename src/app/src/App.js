import React from 'react';
import logo from './logo.svg';
import './App.css';
import Lecture from "./components/Lecture";
import {Provider} from "react-redux";
import {createStore} from "redux";
import lectureReducer from "./domain/lectureReducer";

function App() {
  return (
    <Provider className="App" store={createStore(lectureReducer)}>
        <Lecture />
    </Provider>
  );
}

export default App;
