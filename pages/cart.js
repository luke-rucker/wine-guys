import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Loader } from 'semantic-ui-react'

const CartItems = dynamic(() => import('../components/cart/cart-items'), {
    ssr: false,
    loading: () => <Loader active inline="centered" />,
})

const CartSummary = dynamic(() => import('../components/cart/cart-summary'), {
    ssr: false,
})

export default function Cart() {
    return (
        <>
            <Head>
                <title>Cart | Wein Guys</title>
            </Head>
            <CartItems />
            <CartSummary />
        </>
    )
}
