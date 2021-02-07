import Link from 'next/link'
import { Item, Button, Message } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'

export default function CartItems() {
    const cart = useCart()

    if (cart.items.length === 0) {
        return (
            <Message warning>
                <Message.Header>Your cart is empty</Message.Header>
                <p>
                    You will need to add some items to the cart before you can
                    checkout.
                </p>
            </Message>
        )
    }

    return (
        <Item.Group divided>
            {cart.items.map((item, index) => (
                <CartItem item={item} key={index} />
            ))}
        </Item.Group>
    )
}

function CartItem({ item }) {
    const cart = useCart()
    const { product } = item

    return (
        <Item
            style={{
                overflowWrap: 'break-word',
            }}
        >
            <Item.Image
                src={product.imageUrl}
                alt={product.name}
                size="small"
            />
            <Item.Content>
                <Item.Header>
                    <Link href={`/products/${product.slug}/`}>
                        {product.name}
                    </Link>
                </Item.Header>
                <Item.Meta>{`${item.quantity} x ${product.formattedPrice}`}</Item.Meta>
                <Item.Description>
                    {item.product.customization &&
                        Object.entries(item.product.customization).map(
                            customization => {
                                const [name, value] = customization
                                return (
                                    <p key={name}>
                                        {name.charAt(0).toUpperCase() +
                                            name.slice(1)}
                                        : {value.length >= 26 && <br />} {value}
                                    </p>
                                )
                            }
                        )}
                </Item.Description>
                <Item.Extra>
                    <Button
                        basic
                        icon="remove"
                        floated="right"
                        onClick={() => cart.removeItem(item)}
                    />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}
