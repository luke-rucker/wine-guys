import Head from 'next/head'
import dynamic from 'next/dynamic'
import prisma from '../prisma'

const CheckoutInfoForm = dynamic(
    () => import('../components/checkout/checkout-info-form'),
    { ssr: false }
)

export default function Checkout({ giftIds }) {
    return (
        <>
            <Head>
                <title>Checkout | Wein Guys</title>
            </Head>
            <h1>Checkout</h1>
            <CheckoutInfoForm giftIds={giftIds} />
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
