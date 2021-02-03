const germanEuro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
})

export const formatCurrency = amount => germanEuro.format(amount)
