import React from 'react'
import isEqual from 'lodash.isequal'

const CartContext = React.createContext()

function CartProvider({ children }) {
    const cartItems = localStorage.getItem('cartItems')

    const [items, setItems] = React.useState(
        cartItems ? JSON.parse(cartItems) : []
    )

    React.useEffect(
        () => localStorage.setItem('cartItems', JSON.stringify(items)),
        [items]
    )

    function addProduct(product, quantity = 1) {
        const existingItemIndex = items.findIndex(item =>
            isEqual(item.product, product)
        )

        let newItems

        // Product not already in cart
        if (existingItemIndex === -1) {
            newItems = [...items, { product, quantity }]
        } else {
            const { [existingItemIndex]: existingItem } = items
            existingItem.quantity += parseInt(quantity)

            newItems = [
                ...items.filter(item => !isEqual(item.product, product)),
                { ...existingItem },
            ]
        }

        setItems(newItems)
    }

    function removeItem(item) {
        const newItems = items.filter(i => !isEqual(i, item))
        setItems(newItems)
    }

    function itemCount() {
        return items.reduce((acc, item) => acc + parseInt(item.quantity), 0)
    }

    function total() {
        return items.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
        )
    }

    return (
        <CartContext.Provider
            value={{ items, addProduct, removeItem, itemCount, total }}
        >
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
