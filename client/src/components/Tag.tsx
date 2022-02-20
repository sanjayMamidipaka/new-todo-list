import React from 'react'
import './Tag.css'

function Tag({name, theIndex, remove, include}: {name: string, theIndex: number, remove: Function, include: string}) {
    return (
        <p className='Tag' onClick={(e) => remove(theIndex)}>
            <span style={{fontWeight: "bold"}}>{include}</span> {name}
        </p>
    )
}

export default Tag
