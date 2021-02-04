import Head from 'next/head'
import { Logo, ProductList } from '../components'
import prisma from '../prisma'
import { formatCurrency } from '../util'

export default function Store({ products }) {
    return (
        <>
            <Head>
                <title>Store | Wein Guys</title>
            </Head>
            <Logo style={{ display: 'block' }} />
            <ProductList products={products} />
        </>
    )
}

export async function getStaticProps() {
    const products = await prisma.product.findMany()
    products.forEach(
        product => (product.formattedPrice = formatCurrency(product.price))
    )

    return {
        props: {
            products,
        },
    }
}
