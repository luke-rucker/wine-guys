import dynamic from 'next/dynamic'
import Head from 'next/head'

const CartItems = dynamic(() => import('../components/cart/cart-items'), {
    ssr: false,
})

export default function Cart() {
    return (
        <>
            <Head>
                <title>Cart | Wein Guys</title>
            </Head>
            <h1>Cart</h1>
            <CartItems />
        </>
    )
}
