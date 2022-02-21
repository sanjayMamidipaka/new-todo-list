import React from 'react'
import './Tag.css'

function Tag({name, theIndex, remove, include}: {name: string, theIndex: number, remove: Function, include: string}) {
    return (
        <div className='Tag' onClick={(e) => remove(theIndex)}>
                <i className="fa-solid fa-circle-xmark"></i>
                {name}
        </div>
    )
}

export default Tag
