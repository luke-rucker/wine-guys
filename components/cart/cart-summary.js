import { Divider, Segment, Button } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'
import { formatCurrency } from '../../util'

export default function CartSummary() {
    const cart = useCart()

    return (
        <div>
            <Divider />
            <Segment clearing size="large">
                <span>
                    <strong>Total:</strong>
                    {` ${formatCurrency(cart.total())}`}
                </span>
                <Button color="black" floated="right">
                    Check out
                </Button>
            </Segment>
        </div>
    )
}
