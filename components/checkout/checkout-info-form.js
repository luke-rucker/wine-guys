import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import GiftInfoForm from './gift-info-form'
import PersonalInfoForm from './personal-info-form'
import { useCart } from '../../context/cart-context'

export default function CheckoutInfoForm({ giftIds }) {
    const cart = useCart()

    const [isGift, setIsGift] = React.useState(false)

    const cartContainsGift =
        cart.items.filter(item => giftIds.includes(item.product.id)).length > 0

    if (cartContainsGift) {
        return (
            <>
                <Checkbox
                    disabled
                    defaultChecked
                    label="This order is a gift."
                />
                <p>This order contains item(s) that are gifts.</p>
                <GiftInfoForm />
            </>
        )
    }

    return (
        <>
            <Checkbox
                label="This order is a gift."
                onChange={() => setIsGift(!isGift)}
            />
            {isGift ? <GiftInfoForm /> : <PersonalInfoForm />}
        </>
    )
}
