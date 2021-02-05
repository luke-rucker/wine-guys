import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Loader } from 'semantic-ui-react'
import { Logo, ProductList } from '../components'
import prisma from '../prisma'
import { formatCurrency } from '../util'

const DeliveryTerms = dynamic(() => import('../components/delivery-terms'), {
    ssr: false,
})

export default function Store({ products }) {
    const router = useRouter()

    if (router.isFallback) {
        return <Loader active inline="centered" />
    }

    return (
        <>
            <Head>
                <title>Store | Wein Guys</title>
            </Head>
            <DeliveryTerms />
            <Logo />
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
