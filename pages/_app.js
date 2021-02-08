import dynamic from 'next/dynamic'
import { Layout } from '../components'
import 'semantic-ui-css/semantic.min.css'

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
