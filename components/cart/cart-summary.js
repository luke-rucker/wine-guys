import React from 'react'
import { useRouter } from 'next/router'
import { Divider, Segment, Button } from 'semantic-ui-react'
import { useCart } from '../../context/cart-context'
import { formatCurrency } from '../../util'

export default function CartSummary() {
    const router = useRouter()
    const cart = useCart()

    React.useEffect(() => router.prefetch('/checkout'), [])

    return (
        <div>
            <Divider />
            <Segment clearing size="large">
                <span>
                    <strong>Total:</strong>
                    {` ${formatCurrency(cart.total())}`}
                </span>
                <Button
                    color="black"
                    floated="right"
                    disabled={cart.itemCount() === 0}
                    onClick={() => router.push('/checkout')}
                >
                    Check out
                </Button>
            </Segment>
        </div>
    )
}
