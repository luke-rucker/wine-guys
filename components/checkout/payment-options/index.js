import React from 'react'
import { Segment } from 'semantic-ui-react'
import { useFormikContext } from 'formik'
import { useCart } from '../../../context/cart-context'
import { formatCurrency } from '../../../util'
import CashPaymentButton from './cash-payment-button'

export default function PaymentOptions({ error }) {
    const cart = useCart()
    const {
        values: { paymentMethod },
        setFieldValue,
    } = useFormikContext()

    React.useEffect(
        () =>
            setFieldValue(
                'lineItems',
                cart.items.map(item => {
                    const { id, customization } = item.product
                    return {
                        productId: id,
                        customization,
                        quantity: item.quantity,
                    }
                })
            ),
        []
    )

    return (
        <>
            <h4>Payment</h4>
            <Segment size="large">
                <p style={{ marginBottom: '1em' }}>
                    <strong>Total:</strong>
                    {` ${formatCurrency(cart.total())}`}
                </p>
                <CashPaymentButton />
                {error && paymentMethod === 'CASH' && (
                    <div style={{ color: 'red' }}>{error}</div>
                )}
            </Segment>
        </>
    )
}
