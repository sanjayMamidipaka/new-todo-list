import React, { EventHandler } from 'react'
import { transform } from 'typescript';
import { useState } from 'react';
import Tag from './Tag';
import './TodoItem.css';

// export const isChecked = () => {
//     return checked;
// }

export default function TodoItem({todoListItem, index, parentCallBack}: {todoListItem: any, index: string, parentCallBack: Function}) {
    const {title, dueDate, tagList, completed} = todoListItem;

    const transformDate = (dueDate: string) => {
        const date: string = dueDate;
        const splitted = date.split('-')
        const newDate = splitted[1] + "/" + splitted[2] + "/" + splitted[0];
        return newDate
    }

    
    return (
        // <div className="card">
        //     <input type="checkbox" className="checkBox"/>
        //     <h6 className="date">by: {dueDate}</h6>
        <div className="card">
            <div className="grid-container">
                <div className="grid-item">
                    <input type="checkbox" onChange={(e)=> parentCallBack(e.target.checked, index)}/>
                </div>
                <div className="grid-item">
                    <h1 style={{fontSize: '30px', marginBottom: '-15px'}}>{title}</h1>
                    {tagList.map((tagObject: {name1: string, index1: number}, index: number) => {
                        return <Tag name={tagObject.name1} key={tagObject.index1} theIndex={tagObject.index1} remove={()=>{}} include={""}></Tag>
                    })}
                    </div>
                <div className="grid-item"><h6 style={{fontSize: "10px"}}>by: {transformDate(dueDate)}</h6></div>  
            </div>
        </div>
    )
}