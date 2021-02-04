import { useCart } from '../../context/cart-context'
import { Icon } from 'semantic-ui-react'

export default function CartIcon() {
    const cart = useCart()

    return (
        <>
            <Icon name="cart" />
            Cart {cart.items.length >= 9 ? '9+' : `(${cart.items.length})`}
        </>
    )
}
