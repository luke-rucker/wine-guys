import React from 'react'
import { useFormikContext } from 'formik'
import { Header, Segment } from 'semantic-ui-react'
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

    const shouldApplyDiscount = new Date() < new Date('2021-02-13T00:00')

    function calculateTotal() {
        return shouldApplyDiscount ? cart.total() * 0.9 : cart.total()
    }

    return (
        <>
            <Header as="h4">Payment</Header>
            <Segment>
                <table
                    style={{
                        textAlign: 'right',
                        marginBottom: '1em',
                    }}
                >
                    <tbody>
                        {shouldApplyDiscount && (
                            <>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>{` ${formatCurrency(
                                        cart.total()
                                    )}`}</td>
                                </tr>
                                <tr>
                                    <td>Discount:</td>
                                    <td>{` ${formatCurrency(
                                        calculateTotal() - cart.total()
                                    )}`}</td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td>
                                <strong>Total:</strong>
                            </td>
                            <td>{` ${formatCurrency(calculateTotal())}`}</td>
                        </tr>
                    </tbody>
                </table>
                <CashPaymentButton />
                {error && paymentMethod === 'CASH' && (
                    <div style={{ color: 'red' }}>{error}</div>
                )}
            </Segment>
        </>
    )
}
