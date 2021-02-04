import { Layout } from '../components'
import 'semantic-ui-css/semantic.min.css'

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
