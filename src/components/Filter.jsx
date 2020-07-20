import React from 'react'

export default (props) => {
    function handleInputChange(event) {
        props.onChangeFilter(event.target.value)
    }

    return (
        <div className="row">
            <div className="col m4">
                <button data-target="createModal" className="btn modal-trigger">+ NOVO LANÇAMENTO</button>
            </div>
            <div className="col m8">
                <input type="text" value={props.value} onChange={handleInputChange}></input>
            </div>
        </div>
    )
}