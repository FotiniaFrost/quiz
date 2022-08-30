import React from 'react'

function Categories({ items, getTopicId }) {

    return (
        <div>
            <h1>Сhoose a quiz topic</h1>
            <ul className='categories'>
                {items.map((name, i) =>
                    <li key={name.id}
                        onClick={() => getTopicId(name.id)}>
                        {name.name}
                    </li>
                )}

            </ul>
        </div>
    )
}

export default Categories;