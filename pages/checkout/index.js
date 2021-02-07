import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Divider, Button, Loader } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Form } from 'formik-semantic-ui-react'
import { CheckoutContactForm } from '../../components'
import prisma from '../../prisma'

const DeliveryInfoForm = dynamic(
    () => import('../../components/checkout/delivery-info-form'),
    { ssr: false, loading: () => <Loader active inline="centered" /> }
)

const PaymentOptions = dynamic(
    () => import('../../components/checkout/payment-options'),
    { ssr: false, loading: () => <Loader active inline="centered" /> }
)

export default function Checkout({ giftIds }) {
    const router = useRouter()

    React.useEffect(() => router.prefetch('/cart'), [])

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
            setError('')
        }
    }

    return (
        <>
            <Head>
                <title>Checkout | Wein Guys</title>
            </Head>
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
                    <CheckoutContactForm />
                    <Divider />
                    <DeliveryInfoForm giftIds={giftIds} />
                    <Divider />
                    <PaymentOptions error={error} />
                </Form>
            </Formik>
        </>
    )
}

export async function getStaticProps() {
    const gifts = await prisma.product.findMany({
        where: { isGift: true },
        select: { id: true },
    })

    const giftIds = gifts.map(gift => gift.id)

    return { props: { giftIds } }
}
