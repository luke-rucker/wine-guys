import dynamic from 'next/dynamic'
import 'semantic-ui-css/semantic.min.css'
import { Layout } from '../components'

const CartProvider = dynamic(
    () =>
        import('../context/cart-context').then(
            cartContext => cartContext.CartProvider
        ),
    { ssr: false }
)

export default function App({ Component, pageProps }) {
    return (
        <CartProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CartProvider>
    )
}
