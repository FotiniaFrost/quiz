import React from 'react'

function StepBar({ progress }) {
    return (
        <div className='stepBar'>

            <div className='stepBar_progress' style={{ width: `${progress}%` }}></div >
        </div >
    )
}

export default StepBar