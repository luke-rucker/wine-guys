import React from 'react'
import { Checkbox, Segment } from 'semantic-ui-react'
import GiftDeliveryForm from './gift-delivery-form'
import PersonalDeliveryForm from './personal-delivery-form'
import { useCart } from '../../context/cart-context'

export default function DeliveryInfoForm({ giftIds }) {
    const cart = useCart()

    const [isGift, setIsGift] = React.useState(false)

    const cartContainsGift =
        cart.items.filter(item => giftIds.includes(item.product.id)).length > 0

    if (cartContainsGift) {
        return (
            <>
                <h4>Delivery</h4>
                <p>This order contains item(s) that are gifts.</p>
                <Checkbox
                    disabled
                    defaultChecked
                    label="This order is a gift."
                />
                <GiftDeliveryForm />
            </>
        )
    }

    return (
        <>
            <h4>Delivery</h4>
            <Checkbox
                label="This order is a gift."
                onChange={() => setIsGift(!isGift)}
            />
            {isGift ? <GiftDeliveryForm /> : <PersonalDeliveryForm />}
        </>
    )
}
