import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Logo, ProductList } from '../components'
import prisma from '../prisma'
import { formatCurrency } from '../util'

const DeliveryTerms = dynamic(() => import('../components/delivery-terms'), {
    ssr: false,
})

export default function Store({ products }) {
    return (
        <>
            <Head>
                <title>Store | Wein Guys</title>
            </Head>
            <Logo />
            <DeliveryTerms />
            <ProductList products={products} />
        </>
    )
}

export async function getStaticProps() {
    const products = await prisma.product.findMany({
        orderBy: { price: 'desc' },
    })

    products.forEach(
        product => (product.formattedPrice = formatCurrency(product.price))
    )

    return {
        props: {
            products,
        },
        revalidate: 5,
    }
}
