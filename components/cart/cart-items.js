import { useCart } from '../../context/cart-context'

export default function CartItems() {
    const cart = useCart()

    if (cart.items.length === 0) {
        return <p>No items are in your cart.</p>
    }

    return (
        <ul>
            {cart.items.map((item, index) => (
                <li key={index}>{item.name}</li>
            ))}
        </ul>
    )
}
