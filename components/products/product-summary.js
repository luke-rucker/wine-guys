import dynamic from 'next/dynamic'
import { Item } from 'semantic-ui-react'

const AddToCart = dynamic(() => import('./add-to-cart'), { ssr: false })

export default function ProductSummary({ product }) {
    return (
        <Item.Group>
            <Item style={{ alignItems: 'center' }}>
                <Item.Image
                    size="medium"
                    src={`/products/${product.slug}.png`}
                    alt={product.name}
                />
                <Item.Content style={{ width: '100%' }}>
                    <Item.Header>{product.name}</Item.Header>
                    <Item.Description>
                        <p>{product.formattedPrice}</p>
                    </Item.Description>
                    <Item.Extra>
                        <AddToCart product={product} />
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}
