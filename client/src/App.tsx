import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import ModalEmail from './components/ModalEmail'
import { emailContext } from './components/Context';
import {useState} from 'react';

function App() {
  const emailState = useState('');

  return (
    <div className="App">
      <emailContext.Provider value={emailState}>
        <ModalEmail></ModalEmail>
        <TodoList/>
      </emailContext.Provider>
    </div>
  );
}

export default App;
