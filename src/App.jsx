import React, { useState, useEffect } from 'react';
import './App.css'

import { formatMonth } from './helpers/formatHelpers'
import { getAllTransaction, newTransaction, updateTransaction, deleteTransaction } from './api/apiService'

import Months from './components/Months';
import Info from './components/Info';
import Filter from './components/Filter';
import Transactions from './components/Transactions';

import M from 'materialize-css'
import ModalEdit from './components/modals/ModalEdit';

function App() {
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [filtredTransactions, setFiltredTransactions] = useState([])
  const [filteredValue, setFilteredValue] = useState('')

  const [currentMonth, setCurrentMonth] = useState('')

  const [isTypeSelected, setIsTypeSelected] = useState(false)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [value, setValue] = useState(0)
  const [data, setData] = useState('')
  const [revenue, setRevenue] = useState(false)

  const [transactionEdit, setTransactionEdit] = useState({})

  useEffect(() => {
    M.AutoInit()

    const data = new Date()
    const yearMonth = `${data.getFullYear()}-${formatMonth(data.getMonth() + 1)}`
    setCurrentMonth(yearMonth)
  }, [])

  useEffect(() => {
    if (currentMonth) {
      getAllTransaction(currentMonth).then(
        (json) => setCurrentTransactions(json)
      )
    }
    setData(`${currentMonth}-01`)
  }, [currentMonth])

  useEffect(() => {
    setFilteredValue('')
    setFiltredTransactions(currentTransactions)
  }, [currentTransactions])

  // Modal Create methods
  function handlerDataChange(data) {
    setCurrentMonth(data)
  }

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

  function handleRevenueChange() {
    setIsTypeSelected(true)
    setRevenue(true)
  }

  function handleExpensesChange() {
    setIsTypeSelected(true)
    setRevenue(false)
  }

  function handleSaveClick() {
    const transaction = {
      description,
      value,
      category,
      year: +data.split('-')[0],
      month: +data.split('-')[1],
      day: +data.split('-')[2],
      yearMonth: `${data.split('-')[0]}-${data.split('-')[1]}`,
      yearMonthDay: data,
      type: revenue ? '+' : '-'
    }

    newTransaction(transaction).then(
      () => {
        setDescription('')
        setValue(0)
        setCategory('')
        setData(`${currentMonth}-01`)
        setCurrentMonth(transaction.yearMonth)
        getAllTransaction(currentMonth).then((json) => setCurrentTransactions(json))
      }
    )
  }

  function handleEditClick(id) {
    const transaction = currentTransactions.filter((item) => item._id === id)
    console.log(transaction[0])
    setTransactionEdit(transaction[0])
  }

  function handleUpdateClick(transaction) {
    updateTransaction(transaction)
      .then(() => getAllTransaction(currentMonth).then((json) => setCurrentTransactions(json)))
      .catch((err) => console.log(`Error when update transaction: ${err}`))
  }

  function handleDeleteClick(id) {
    deleteTransaction(id)
      .then(() => getAllTransaction(currentMonth).then((json) => setCurrentTransactions(json)))
      .catch((err) => console.log(`Error when delete transaction: ${err}`))
  }

  function isValidCreate() {
    return (description !== '' && category !== '' && value !== 0 && data !== '' && isTypeSelected)
  }

  // Filter methods
  function handlerFilter(value) {
    if (value === '') {
      setFiltredTransactions(currentTransactions)
    } else {
      const filtred = currentTransactions.filter((transaction) => {
        return transaction.description.toLowerCase().includes(value.toLowerCase()) ? true : false
      })
      setFiltredTransactions(filtred)
    }
    setFilteredValue(value)
  }

  function getRevenue() {
    const revenue = filtredTransactions.reduce((acc, transaction) => {
      return transaction.type === '+' ? acc + transaction.value : acc
    }, 0)
    return revenue
  }

  function getExpenses() {
    const expenses = filtredTransactions.reduce((acc, transaction) => {
      return transaction.type === '-' ? acc + transaction.value : acc
    }, 0)
    return expenses
  }

  return (
    <>
      <div className="container">
        <h1>Bootcamp Full Stack - Desafio final</h1>
        <h2>Controle Financeiro Pessoal</h2>
        <Months data={currentMonth} onChangeData={handlerDataChange} />
        <Info qtd={filtredTransactions.length} revenue={getRevenue()} expense={getExpenses()} />
        <Filter value={filteredValue} onChangeFilter={handlerFilter} />
        <Transactions transactions={filtredTransactions} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
      </div>
      <ModalEdit transaction={transactionEdit} handleUpdateClick={handleUpdateClick}></ModalEdit>
      <div id="createModal" className="modal">
        <div className="modal-content">
          <div style={style.modalHeader}>
            <h4>Inclusão de lançamento</h4>
            <button className="btn red modal-close">X</button>
          </div>
          <div style={style.modalBody}>
            <form className="container center">
              <label>
                <input name="typeTransaction" type="radio" onChange={handleExpensesChange}></input>
                <span className="red-text">Despesa</span>
              </label>
              <label>
                <input name="typeTransaction" type="radio" onChange={handleRevenueChange}></input>
                <span className="green-text">Receita</span>
              </label>
            </form>
            <div className="input-field">
              <label htmlFor="descricao">Descrição</label>
              <input id="descricao" type="text" onChange={handleDescriptionChange}></input>
            </div>
            <div className="input-field">
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" onChange={handleCategoryChange} />
            </div>
            <div className="input-field">
              <label htmlFor="valor"></label>
              <input type="number" value={value} id="valor" min="0.01" step="0.01" onChange={handleValueChange} />
            </div>
            <div>
              <input placeholder="Data" type="date" className="browser-default" value={data} onChange={handleDataChange} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn modal-close" value={`${currentMonth}-01`} disabled={!isValidCreate()} onClick={handleSaveClick}>Criar</button>
        </div>
      </div>
    </>

  );
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

export default App;