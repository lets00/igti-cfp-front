const moneyFormat = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

function formatMoney(value) {
    return moneyFormat.format(value)
}


function formatMonth(value) {
    return value < 10 ? `0${value}` : `${value}`
}

export {
    formatMoney,
    formatMonth
}