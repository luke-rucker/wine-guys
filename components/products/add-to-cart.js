import React from 'react'
import { Input, Icon, Transition } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'

export default function AddToCart({ product }) {
    const cart = useCart()

    const [quantity, setQuantity] = React.useState(1)
    const [visible, setVisible] = React.useState(false)

    function handleChange({ target: { value } }) {
        if (!value) return
        setQuantity(parseInt(value))
    }

    function handleSubmit() {
        cart.addItem(product, quantity)
        setVisible(true)
        setTimeout(() => setVisible(false), 1000)
    }

    return (
        <>
            <Input
                type="number"
                placeholder="Quantity"
                value={quantity}
                min={1}
                step={1}
                onChange={handleChange}
                action={{
                    style: { backgroundColor: '#8d1111', color: '#fff' },
                    content: 'Add to Cart',
                    icon: 'plus cart',
                    onClick: handleSubmit,
                }}
            />
            <Transition duration={{ hide: 1000, show: 1000 }} visible={visible}>
                <div style={{ color: 'green', position: 'absolute' }}>
                    <Icon name="check" />
                    Added to cart
                </div>
            </Transition>
        </>
    )
}
