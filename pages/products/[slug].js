import Head from 'next/head'
import { ProductSummary, ProductDescription } from '../../components'
import prisma from '../../prisma'
import { formatCurrency } from '../../util'

export default function Product({ product }) {
    return (
        <>
            <Head>
                <title>{product.name} | Wein Guys</title>
            </Head>
            <ProductSummary product={product} />
            <ProductDescription product={product} />
        </>
    )
}

export async function getStaticPaths() {
    const products = await prisma.product.findMany({
        select: { slug: true },
    })

    const paths = products.map(product => ({
        params: {
            slug: product.slug,
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
    })
    product.formattedPrice = formatCurrency(product.price)
    return { props: { product } }
}
