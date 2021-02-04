import React from 'react'

const CartContext = React.createContext()

function CartProvider({ children }) {
    const cartItems = localStorage.getItem('cartItems')

    const [items, setItems] = React.useState(
        cartItems ? JSON.parse(cartItems) : []
    )

    function addItem(item, quantity = 1) {
        const itemsToAdd = []
        for (let i = 0; i < quantity; i++) {
            itemsToAdd.push(item)
        }
        const newItems = items.concat(itemsToAdd)
        setItems(newItems)
        localStorage.setItem('cartItems', JSON.stringify(newItems))
    }

    function removeItem(index) {
        const newItems = items.splice(index, 1)
        setCart(newItems)
        localStorage.setItem('cartItems', JSON.stringify(newItems))
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    const cartContext = React.useContext(CartContext)
    if (cartContext === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return cartContext
}

export { CartProvider, useCart }
