const germanEuro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
})

export const formatCurrency = amount => germanEuro.format(amount)

export function makeSelectOptions(values) {
    return values.map(v => ({ key: v, value: v, text: v }))
}
