import React from 'react'
import { Card, Image as SemanticImage, Container } from 'semantic-ui-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '../util'

export default function ProductList({ products }) {
    return (
        <Container text>
            <Card.Group itemsPerRow={2} centered stackable>
                {products.map(product => (
                    <ProductCard product={product} />
                ))}
            </Card.Group>
        </Container>
    )
}

function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.slug}`} key={product.id}>
            <Card link>
                <SemanticImage>
                    <Image
                        src={product.imageUrl}
                        height={300}
                        width={300}
                        layout="responsive"
                        alt={product.name}
                    />
                </SemanticImage>
                <Card.Content>
                    <Card.Header>{product.name}</Card.Header>
                    <Card.Meta style={{ color: 'dimgray' }}>
                        {formatCurrency(product.price)}
                    </Card.Meta>
                </Card.Content>
            </Card>
        </Link>
    )
}
