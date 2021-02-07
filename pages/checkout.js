import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/Head'
import { Loader } from 'semantic-ui-react'
import prisma from '../prisma'
import ThankYou from '../components/checkout/thank-you'

const CheckoutForm = dynamic(() => import('../components/checkout'), {
    ssr: false,
    loading: () => <Loader active inline="centered" />,
})

export default function Checkout({ giftIds }) {
    const [success, setSuccess] = React.useState(false)

    return (
        <>
            <Head>
                <title>Checkout | Wein Guys</title>
            </Head>
            {success ? (
                <ThankYou />
            ) : (
                <CheckoutForm giftIds={giftIds} setSuccess={setSuccess} />
            )}
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
