import { ProductList } from '../components'
import prisma from '../prisma'

export default function Store({ products }) {
    return <ProductList products={products} />
}

export async function getStaticProps() {
    const products = await prisma.products.findMany()

    return {
        props: {
            products,
        },
    }
}
