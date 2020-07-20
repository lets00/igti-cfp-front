import React, { useEffect, useState } from 'react';
import './Months.css'

import { formatMonth } from '../helpers/formatHelpers'

export default (props) => {
    const [monthsValue, setMonthsValue] = useState([])
    // const [month, setMonth] = useState("")

    useEffect(() => {
        const monthsName = ["Jan", "Fev", "Mar", "Abr", "Mai",
            "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        const months = [2019, 2020, 2021].reduce((accYear, year) => {
            const monthDict = monthsName.reduce((accMonth, month, index) => {
                return [...accMonth, { name: `${month}/${year}`, value: `${year}-${formatMonth(index + 1)}` }]
            }, [])
            return [...accYear, ...monthDict]
        }, [])
        setMonthsValue(months)
    }, [])

    // useEffect(() => {

    // }, [month])


    function isPlusActive() {
        return props.data === '2021-12'
    }

    function isMinusActive() {
        return props.data === '2019-01'
    }

    function handleButtonClick(event) {
        const index = monthsValue.findIndex((m) => m.value === props.data ? true : false)
        if (event.target.id === 'btn-plus') {
            props.onChangeData(monthsValue[index + 1].value)
        } else {
            props.onChangeData(monthsValue[index - 1].value)
        }
    }

    function handleSelectChange(event) {
        props.onChangeData(event.target.value)
    }

    return (
        <div className="month">
            <button
                className="btn buttonBackNext"
                id="btn-minus"
                style={{ marginRight: "5px" }}
                disabled={isMinusActive()}
                onClick={handleButtonClick}>{'<'}</button>
            <select
                className="browser-default"
                value={props.data}
                onChange={handleSelectChange}>
                {monthsValue.map((month) => {
                    return (
                        <option key={month.value} value={month.value}>{month.name}</option>
                    )
                })}
            </select>
            <button
                className="btn buttonBackNext"
                id="btn-plus"
                disabled={isPlusActive()}
                onClick={handleButtonClick}>{'>'}</button>
        </div>
    )
}