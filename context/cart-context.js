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

    function getItem(product) {
        const index = items.findIndex(item => isEqual(item.product, product))
        return index !== -1 ? items[index] : null
    }

    function addProduct(product, quantity = 1) {
        const itemAlreadyInCart = getItem(product)

        if (!itemAlreadyInCart) {
            setItems([...items, { product, quantity }])
        } else {
            itemAlreadyInCart.quantity += quantity
            setItems([
                ...items.filter(item => !isEqual(item.product, product)),
                { ...itemAlreadyInCart },
            ])
        }
    }

    function removeItem(item) {
        const newItems = items.filter(i => !isEqual(i, item))
        setItems(newItems)
    }

    function empty() {
        setItems([])
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
            value={{
                items,
                getItem,
                addProduct,
                removeItem,
                empty,
                itemCount,
                total,
            }}
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
