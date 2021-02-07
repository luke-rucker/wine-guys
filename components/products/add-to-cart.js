import React from 'react'
import { Formik } from 'formik'
import { Form, Select, TextArea, SubmitButton } from 'formik-semantic-ui-react'
import { Icon, Transition } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'
import { makeSelectOptions } from '../../util'

// TODO: make this solution way less ugly lol
export default function AddToCart({ product }) {
    const cart = useCart()

    const [messageVisible, setMessageVisible] = React.useState(false)

    const initalValues = {
        quantity: 1,
        ...(product.hasWine ? { wine: 'Red' } : null),
        ...(product.hasMessage ? { message: '' } : null),
    }

    function handleSubmit(values) {
        const { quantity, ...customization } = values

        if (Object.keys(customization).length > 0) {
            cart.addProduct({ customization, ...product }, quantity)
        } else {
            cart.addProduct({ ...product }, quantity)
        }

        setMessageVisible(true)
        setTimeout(() => setMessageVisible(false), 1000)
    }

    return (
        <Formik initialValues={initalValues} onSubmit={handleSubmit}>
            <Form>
                {product.hasWine && <WineSelection />}
                {product.hasMessage && <MessageField />}
                <QuantityField product={product} />
                <SubmitButton
                    style={{ backgroundColor: '#8d1111', color: '#fff' }}
                    loading={false}
                >
                    <Icon name="plus cart" />
                    Add to cart
                </SubmitButton>
                <Transition
                    duration={{ hide: 1000, show: 1000 }}
                    visible={messageVisible}
                >
                    <div style={{ color: 'green', position: 'absolute' }}>
                        <Icon name="check" />
                        Added to cart
                    </div>
                </Transition>
            </Form>
        </Formik>
    )
}

function WineSelection() {
    const wines = makeSelectOptions(['Red', 'White', 'Rosé'])

    return <Select name="wine" label="Wine" options={wines} />
}

function MessageField() {
    const maxLength = 300

    function validate(value) {
        if (!/\S/.test(value)) {
            return 'A message is required.'
        }
        if (value.length > maxLength) {
            return `Message has ${value.length}/${maxLength} allowed characters.`
        }
        return
    }

    return (
        <TextArea
            name="message"
            label="Message"
            validate={validate}
            errorPrompt
            style={{ minHeight: 100 }}
        />
    )
}

function QuantityField({ product }) {
    const cart = useCart()

    const quantites = Array.from(
        Array(product.maxPerOrder ? product.maxPerOrder : 10),
        (v, i) => i + 1
    ).map(quantity => ({ key: quantity, value: quantity, text: quantity }))

    function validate(value) {
        if (product.maxPerOrder) {
            const itemInCart = cart.getItem(product)
            const quantityInCart = itemInCart ? itemInCart.quantity : 0

            if (quantityInCart + parseInt(value) > product.maxPerOrder) {
                return `Only ${product.maxPerOrder} ${product.name}'s are allowed per order.`
            }
        }
        return
    }

    return (
        <Select
            name="quantity"
            label="Quantity"
            options={quantites}
            validate={validate}
            errorPrompt
        />
    )
}
