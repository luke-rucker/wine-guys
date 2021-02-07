import React from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Form } from 'formik-semantic-ui-react'
import { Button, Divider } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'
import ContactForm from './contact-form'
import DeliveryInfoForm from './delivery-info-form'
import PaymentOptions from './payment-options'

export default function CheckoutForm({ giftIds, setSuccess }) {
    const router = useRouter()
    const cart = useCart()

    React.useEffect(() => router.prefetch('/cart'), [])

    React.useEffect(() => {
        if (cart.itemCount() === 0) {
            router.push('/cart')
        }
    }, [])

    const [error, setError] = React.useState('')

    async function handleSubmit(values) {
        const { isGift, personalDelivery, giftRecipient, ...rest } = values

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...rest,
                isGift,
                deliveryInfo: isGift ? giftRecipient : personalDelivery,
            }),
        })

        if (!response.ok) {
            setError('Could not submit your order.')
        } else {
            cart.empty()
            setSuccess(true)
        }
    }

    return (
        <>
            <Button
                labelPosition="left"
                icon="left chevron"
                content="Back to your cart"
                onClick={() => router.push('/cart')}
            />
            <Divider />
            <Formik
                initialValues={{
                    contact: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                    },
                    isGift: false,
                    personalDelivery: {
                        college: 'Krupp',
                        block: 'A',
                        roomNumber: '',
                    },
                    giftRecipient: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                    },
                    lineItems: [],
                    paymentMethod: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <ContactForm />
                    <Divider />
                    <DeliveryInfoForm giftIds={giftIds} />
                    <Divider />
                    <PaymentOptions error={error} />
                </Form>
            </Formik>
        </>
    )
}
