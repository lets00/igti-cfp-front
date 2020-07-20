import React from 'react'
import './Transactions.css'

import {formatMoney, formatMonth} from '../helpers/formatHelpers'

export default (props) => {
    function handleEditClick(id) {
        props.handleEditClick(id)
    }

    function handleDeleteClick(id) {
        console.log('Deleting' + id)
        props.handleDeleteClick(id)
    }

    function colorTransaction(typeOfTransaction) {
        return typeOfTransaction === '-' ? 'red' : 'green'
    }

    return (
        <>
            {props.transactions.map(transaction => {
                return (
                    <div key={transaction._id} className={`row red lighten-1 boxAlign ${colorTransaction(transaction.type)}`}>
                        <div className="col m1">
                            <h5>{formatMonth(transaction.day)}</h5>
                        </div>
                        <div className="col m7">
                            <div>
                                <h5>{transaction.category}</h5>
                                <p>{transaction.description}</p>
                            </div>
                        </div>
                        <div className="col m2">
                            <p>{formatMoney(transaction.value)}</p>
                        </div>
                        <div className="col m1">
                            <i data-target="editModal" onClick={() => handleEditClick(transaction._id)} className="tiny material-icons modal-trigger" style={{ marginRight: "5px" }}>create</i>
                            <i onClick={() => {handleDeleteClick(transaction._id)}} className="tiny material-icons">delete</i>
                        </div>
                    </div>       
                )
            })}
        </>
    )
}



