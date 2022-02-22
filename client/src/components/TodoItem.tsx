import React, { EventHandler, useEffect } from 'react'
import { transform } from 'typescript';
import { useState } from 'react';
import Tag from './Tag';
import './TodoItem.css';
import transformDate from './dateUtility';

// export const isChecked = () => {
//     return checked;
// }

export default function TodoItem({todoListItem, index, parentCallBack, removeHandler}: {todoListItem: any, index: string, parentCallBack: Function, removeHandler: Function}) {
    const {title, dueDate, tagList} = todoListItem;
    
    return (
        // <div className="card">
        //     <input type="checkbox" className="checkBox"/>
        //     <h6 className="date">by: {dueDate}</h6>
        <div className="card">
            <div className="grid-container">
                <div className="hbox todo-title">
                    <input type="checkbox" onChange={(e)=> parentCallBack(e.target.checked, index)}/>
                    <h1 className="todo-header">{title}</h1>
                </div>
                <div className="tag-wrapper">
                    {tagList.map((tagObject: {name1: string, index1: number}, index: number) => {
                        return <Tag name={tagObject.name1} key={tagObject.index1} theIndex={tagObject.index1} remove={()=>{}} include={""}></Tag>
                    })}
                    </div>
                <input type="checkbox" onChange={(e) => {removeHandler(index)}}/>
            </div>
            <h6 className="date-header">by: {transformDate(dueDate)}</h6>
        </div>
    )
}
