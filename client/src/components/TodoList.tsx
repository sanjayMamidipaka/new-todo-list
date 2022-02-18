import React, { EventHandler } from 'react'
import './TodoList.css'
import { useState } from 'react'
import Tag from './Tag'
import TodoItem from './TodoItem'
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
  const [date, setDate] = useState('');
  const completedItems: any[] = [];
  const [todoListCompletedItems, setTodoListCompletedItems] = useState(completedItems);
  const [todoToggle, setTodoToggle] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [checked, setChecked] = useState(false);

  const [tagArray, setTagArray] = useState<{ name1: string, index1: number }[]>([]);

  const addNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (tagValue !== "") {
      setTagArray((tagArray: { name1: string, index1: number }[]) => {
        return [...tagArray, { name1: tagValue, index1: index }];
      });
    }
    setIndex(index + 1);
    setTagValue('');

  }

  const removeElement = (index: number) => {
    setTagArray((tagArray) => {
      let newTagArray = tagArray.filter((tagObject) => tagObject.index1 !== index);

      return newTagArray;
    })

  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemToAdd: any = {
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
    setDate('');
    setChecked(false);
  }

  const sortByTodo = () => {
    setTodoToggle(!todoToggle);

    if (todoToggle === true) {
      const newCompItems = todoListCompletedItems.sort((a, b) => {
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
      const newCompItems = todoListCompletedItems.sort((a, b) => {
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
      const newCompItems = todoListCompletedItems.sort((a, b) => {
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
      const newCompItems = todoListCompletedItems.sort((a, b) => {
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

  var handleCallBack = (childData: boolean, index: string) => {
    // let newTagArray = tagArray.filter((tagObject) => tagObject.index1 !== index);
    todoListCompletedItems.forEach((item) => {
      const { idx } = item;
      if (index == idx) {
        item.checked = childData;
      }

    })


  }
  return (
    <div>
      <div className="top-wrapper">
        <div className="hbox">
          <div className="left">
            <div className="hbox first-line">
              <input className="title-input"
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="date-input"
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }} />
            </div>
            <div className="hbox">
              <input
                type="text"
                className="tag-input"
                placeholder="Add tags"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              />
              <button type="submit" className="tag-btn" onClick={addNewTag}>
                <i className="fa-solid fa-circle-plus"></i>
              </button>
            </div>
          </div>
          <button type='submit' className="add-btn" onClick={handleSubmit}>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </div>
        <div className="tag-wrapper">
          {/* <Tag name="Bruv" key={99} theIndex={99} remove={removeElement} include={""}></Tag>
              <Tag name="Bruh" key={99} theIndex={99} remove={removeElement} include={""}></Tag>
              <Tag name="Bruj" key={99} theIndex={99} remove={removeElement} include={""}></Tag> */}
          {tagArray.map((tagObject: { name1: string, index1: number }) => {
            return <Tag name={tagObject.name1} key={tagObject.index1} theIndex={tagObject.index1} remove={removeElement} include={"x"}></Tag>
          })}
        </div>
      </div>

      <div className="card">
        <div ></div>
        <button onClick={sortByDate}>date</button>
        <button onClick={sortByTodo}>todo</button>
        <div ></div>
      </div>

      <div>
        {todoListCompletedItems.map((todoListItem) => {
          return <TodoItem todoListItem={todoListItem} key={todoListItem.idx} index={todoListItem.idx} parentCallBack={handleCallBack}></TodoItem>
        })}
      </div>

    </div>
  )
}
