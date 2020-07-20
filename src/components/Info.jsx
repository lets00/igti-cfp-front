import React from 'react'
import './Info.css'

import {formatMoney} from '../helpers/formatHelpers'

export default (props) => {
    return (
        <div className="box row">
            <div className="col m3">
                <p><strong>Lançamentos:</strong> {props.qtd}</p>
            </div>
            <div className="col m3">
                <p className="green-text"><strong className="black-text">Receita:</strong> {formatMoney(props.revenue)}</p>
            </div>
            <div className="col m3">
                <p className="red-text"><strong className="black-text">Despesas:</strong> {formatMoney(props.expense)}</p>
            </div>
            <div className="col m3">
                <p><strong>Saldo:</strong> {formatMoney(props.revenue - props.expense)}</p>
            </div>
        </div>
    )
}
