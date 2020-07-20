const API = "https://lets00-cfp-server.herokuapp.com/transaction"

function getAllTransaction(month) {
    return fetch(`${API}?period=${month}`)
        .then(res => res.json())
        .then(json => json)
}

function newTransaction(transaction) {
    const options = {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(API, options)
}

function updateTransaction(transaction){
    const options = {
        method: 'PUT',
        body: JSON.stringify(transaction),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${API}/${transaction._id}`, options)
}

function deleteTransaction(id) {
    const options = {
        method: 'DELETE'
    }
    return fetch(`${API}/${id}`, options)
}

export {
    getAllTransaction,
    newTransaction,
    updateTransaction,
    deleteTransaction
}