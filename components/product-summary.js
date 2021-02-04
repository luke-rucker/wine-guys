import { Item } from 'semantic-ui-react'

export default function ProductSummary({ product }) {
    return (
        <Item.Group>
            <Item style={{ alignItems: 'center' }}>
                <Item.Image
                    size="medium"
                    src={product.imageUrl}
                    alt={product.name}
                />
                <Item.Content>
                    <Item.Header>{product.name}</Item.Header>
                    <Item.Description>
                        <p>{product.formattedPrice}</p>
                    </Item.Description>
                    <Item.Extra>
                        <p>Add to cart</p>
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}
