import React from 'react'
import { Input, Icon, Transition } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'

export default function AddToCart({ product }) {
    const cart = useCart()

    const [error, setError] = React.useState('')
    const [quantity, setQuantity] = React.useState(1)
    const [visible, setVisible] = React.useState(false)

    function handleChange({ target: { value } }) {
        setQuantity(value)
    }

    function validate(quantity) {
        if (!quantity) {
            return 'A quantity is required.'
        }
        if (quantity == 0) {
            return 'A quantity more than zero is required.'
        }
        return
    }

    function handleSubmit() {
        const error = validate(quantity)
        setError(error)

        if (!error) {
            cart.addItem(product, quantity)
            setVisible(true)
            setTimeout(() => setVisible(false), 1000)
        }
    }

    return (
        <>
            <Input
                type="number"
                pattern="[0-9]*"
                inputmode="numeric"
                placeholder="Quantity"
                value={quantity}
                min={1}
                step={1}
                onChange={handleChange}
                error={!!error}
                action={{
                    style: { backgroundColor: '#8d1111', color: '#fff' },
                    content: 'Add to Cart',
                    icon: 'plus cart',
                    onClick: handleSubmit,
                }}
            />
            {error && (
                <div style={{ color: 'red', position: 'absolute' }}>
                    {error}
                </div>
            )}
            <Transition duration={{ hide: 1000, show: 1000 }} visible={visible}>
                <div style={{ color: 'green', position: 'absolute' }}>
                    <Icon name="check" />
                    Added to cart
                </div>
            </Transition>
        </>
    )
}
