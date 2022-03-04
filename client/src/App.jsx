import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import ModalEmail from './components/ModalEmail'
import InstructionsModal from './components/InstructionsModal'
import { emailContext } from './components/Context';
import {useState} from 'react';

function App() {
  // getting email from localStorage
  const email = localStorage.getItem("email");
  const emailState = useState(email);

  return (
    <div className="App">
      <emailContext.Provider value={emailState}>
        <ModalEmail></ModalEmail>
        <InstructionsModal></InstructionsModal>
        <TodoList/>
      </emailContext.Provider>
    </div>
  );
}

export default App;
