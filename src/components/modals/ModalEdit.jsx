import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default (props) => {
    const [description, setDescription] = useState(props.transaction.description)
    const [category, setCategory] = useState(props.transaction.category)
    const [value, setValue] = useState(props.transaction.value)
    const [data, setData] = useState(props.transaction.yearMonthDay)
    const { _id } = props.transaction

    // console.log(props.transaction)
    useEffect( () => {
        setDescription(props.transaction.description)
        setCategory(props.transaction.category)
        setValue(props.transaction.value)
        setData(props.transaction.yearMonthDay)
    }, [props.transaction])

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value)
    }

    function handleValueChange(event) {
        setValue(event.target.value)
    }

    function handleDataChange(event) {
        setData(event.target.value)
    }

    function handleUpdateClick() {
        console.log({ _id, description, category, value, data })
        props.handleUpdateClick({ _id, description, category, value, data })
    }

    function isValidEdit() {
        return category && description && data && value !== 0
    }

    return (
        <div id="editModal" className="modal">
            <div className="modal-content">
                <div style={style.modalHeader}>
                    <h4>Edição de lançamento</h4>
                    <button className="btn red modal-close">X</button>
                </div>
                <div style={style.modalBody}>
                    <div className="input-field">
                        <label htmlFor="descricao">Descrição</label>
                        <input value={description} type="text" id="descricao" onChange={handleDescriptionChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="categoria">Categoria</label>
                        <input value={category} type="text" id="categoria" onChange={handleCategoryChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="valor"></label>
                        <input value={value} type="number" id="valor" min="0.01" step="0.01" onChange={handleValueChange} />
                    </div>
                    <div>
                        <input value={data} type="date" className="browser-default" onChange={handleDataChange} />
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn modal-close" disabled={!isValidEdit()} onClick={handleUpdateClick}>Salvar</button>
            </div>
        </div>
    )
}

const style = {
    modalHeader: {
        display: "flex",
        justifyContent: "space-between"
    },
    modalBody: {
        border: "1px solid lightgray"
    }
}