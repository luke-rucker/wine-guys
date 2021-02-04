import Head from 'next/head'
import { Container } from 'semantic-ui-react'
import { Logo, ProductList } from '../components'
import prisma from '../prisma'
import { formatCurrency } from '../util'

export default function Store({ products }) {
    return (
        <>
            <Head>
                <title>Store | Wein Guys</title>
            </Head>
            <Container text>
                <Logo />
                <ProductList products={products} />
            </Container>
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
