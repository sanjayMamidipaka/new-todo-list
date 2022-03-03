import React, { EventHandler, useEffect } from 'react'
import './TodoList.css'
import { useState, useContext } from 'react'
import Tag from './Tag'
import TodoItem from './TodoItem'
import {emailContext} from './Context'
/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
// TODO: Start coding from here

// Here's a baseline todo item type. 
// Feel free to extend or create your own interface!

export default function TodoList() {
  const [title, setTitle] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState(((new Date()).toLocaleDateString('en-CA') + 'T' + (new Date).toLocaleTimeString('it-IT')).substring(0,16));
  const [todoListCompletedItems, setTodoListCompletedItems] = useState(() => {
    const todoListData = localStorage.getItem('todoListItems');
    return todoListData ? JSON.parse(todoListData) : [];
  });
  const [todoToggle, setTodoToggle] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [checked, setChecked] = useState(false);

  const [tagArray, setTagArray] = useState<{name1: string, index1: number}[]>([]);

  const [email, setEmail] = useContext(emailContext);

    const addNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (tagValue !== "") {
        setTagArray((tagArray: {name1: string, index1: number}[]) => {
          return [...tagArray, {name1: tagValue, index1: index}];
        });
      }
      setIndex(index + 1);
      setTagValue('');

    }
    
    const removeElement = (index: number) => {
      setTagArray((tagArray)=>{
        let newTagArray = tagArray.filter((tagObject) => tagObject.index1 !== index);
        
        return newTagArray;
      })
      
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      const itemToAdd: any = { //ITEM FORMAT
      title: title,
      dueDate: date,
      tagList: tagArray,
      completed: false,
      idx: new Date().getTime().toString(),
      checked: checked,
    }
    setTitle('');
    setTodoListCompletedItems([...todoListCompletedItems, itemToAdd]);
    setTagArray([]);
    setDate(((new Date()).toLocaleDateString('en-CA') + 'T' + (new Date).toLocaleTimeString('it-IT')).substring(0,16));
    setChecked(false);
    console.log(email);
    }

    useEffect(() => {
        localStorage.setItem("todoListItems", JSON.stringify(todoListCompletedItems));
    }, [todoListCompletedItems]);

    const sortByTodo = () => {
      setTodoToggle(!todoToggle);

      if (todoToggle === true) {
        const newCompItems = todoListCompletedItems.sort((a,b) => {
          const aChecked = a.checked;
          const bChecked = b.checked;


          if (aChecked > bChecked) {
            return 1;
          }

          if (aChecked < bChecked) {
            return -1;
          }

          
          return 0;
        });

        setTodoListCompletedItems(newCompItems);
      }
      else {
        const newCompItems = todoListCompletedItems.sort((a,b) => {
          const aChecked = a.checked;
          const bChecked = b.checked;


          if (aChecked < bChecked) {
            return 1;
          }

          if (aChecked > bChecked) {
            return -1;
          }

          
          return 0;
        });

        setTodoListCompletedItems(newCompItems);
      }
    }
    
    const sortByDate = () => {
      setDateToggle(!dateToggle);
      
      
      
      if (dateToggle === true) {
        const newCompItems = todoListCompletedItems.sort((a,b) => {
          const aDate = new Date(a.dueDate);
          const bDate = new Date(b.dueDate);

          if (aDate < bDate) {
            return 1;
          }

          if (aDate > bDate) {
            return -1;
          }

          
          return 0;
        });

        setTodoListCompletedItems(newCompItems);
      }
      else {
        const newCompItems = todoListCompletedItems.sort((a,b) => {
          const aDate = new Date(a.dueDate);
          const bDate = new Date(b.dueDate);

          if (aDate > bDate) {
            return 1;
          }

          if (aDate < bDate) {
            return -1;
          }

          
          return 0;
        });
        setTodoListCompletedItems(newCompItems);
      }
      
    }

    var handleCallBack = (childData: boolean, index: string) =>{
      todoListCompletedItems.forEach((item) => {
        const {idx} = item;
        if (index == idx) {
          item.checked = childData;
        }
        
      })

      
    }

    const removeTodoItem = (index: number) => {
      setTodoListCompletedItems((todoListCompletedItems)=>{
        let newTodoListCompletedItems = todoListCompletedItems.filter((todoListItem) => todoListItem.idx !== index);
        
        return newTodoListCompletedItems;
      })
      
    }

  return (
    <div>
      <div className="top-wrapper">
        <div className="first-line">
          <input className="title-input"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="tag-wrapper removable">
          {/* <Tag name="Bruv" key={99} theIndex={99} remove={removeElement} include={""}></Tag>
              <Tag name="Bruh" key={99} theIndex={99} remove={removeElement} include={""}></Tag>
              <Tag name="Bruj" key={99} theIndex={99} remove={removeElement} include={""}></Tag> */}
          {tagArray.map((tagObject: { name1: string, index1: number }) => {
            return <Tag name={tagObject.name1} key={tagObject.index1} theIndex={tagObject.index1} remove={removeElement} include={"x"}></Tag>
          })}
        </div>
        <div className="hbox second-line">
          <input
          className="date-input"
          type="datetime-local"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }} />
          <div className="hbox">
            <input
              type="text"
              className="tag-input"
              placeholder="Add tags"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            />
            <button type="submit" className="tag-btn" onClick={addNewTag}>
            <i className="fa-solid fa-square-plus"></i>
            </button>
          </div>
        </div>
        <button type='submit' className="add-btn" onClick={handleSubmit}>
          <i className="fa-solid fa-circle-plus"></i>
        </button>

      </div>

      <div className="sort-wrapper hbox">
        <button onClick={sortByDate}>date</button>
        <button onClick={sortByTodo}>todo</button>
      </div>

      <div className="item-wrapper">
          {todoListCompletedItems.map((todoListItem) => {
            return <TodoItem todoListItem={todoListItem} key={todoListItem.idx} index={todoListItem.idx} parentCallBack={handleCallBack} removeHandler={removeTodoItem}></TodoItem>
          })}
      </div>

        </div>
  )
}
