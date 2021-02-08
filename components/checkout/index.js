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

            if (values.paymentMethod === 'PAYPAL') {
                window.open(
                    `${process.env.NEXT_PUBLIC_PAYPAL_ME}/${calculateTotal()}`,
                    '_blank'
                )
            }

            setSuccess(true)
        }
    }

    function calculateTotal() {
        const shouldApplyDiscount = new Date() < new Date('2021-02-13T00:00')
        return shouldApplyDiscount ? cart.total() * 0.9 : cart.total()
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
                        date: '2021-02-14',
                        time: '17:00',
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
                    <PaymentOptions
                        subTotal={cart.total()}
                        discount={calculateTotal() - cart.total()}
                        total={calculateTotal()}
                        error={error}
                    />
                </Form>
            </Formik>
        </>
    )
}
