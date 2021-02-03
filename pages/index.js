import { Container } from 'semantic-ui-react'
import { Logo, ProductList } from '../components'
import prisma from '../prisma'

export default function Store({ products }) {
    return (
        <Container text>
            <Logo />
            <ProductList products={products} />
        </Container>
    )
}

export async function getStaticProps() {
    const products = await prisma.product.findMany()

    return {
        props: {
            products,
        },
    }
}
