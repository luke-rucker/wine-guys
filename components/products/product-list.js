import { Card, Image as SemanticImage } from 'semantic-ui-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductList({ products }) {
    return (
        <Card.Group itemsPerRow={2} stackable>
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </Card.Group>
    )
}

function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.slug}`}>
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
                        {product.formattedPrice}
                    </Card.Meta>
                </Card.Content>
            </Card>
        </Link>
    )
}
