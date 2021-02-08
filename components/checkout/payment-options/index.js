import React from 'react'
import { useFormikContext } from 'formik'
import { Header, Segment } from 'semantic-ui-react'
import { useCart } from '../../../context/cart-context'
import { formatCurrency } from '../../../util'
import Cash from './cash'
import Paypal from './paypal'

export default function PaymentOptions({ subTotal, discount, total, error }) {
    const {
        values: { paymentMethod },
        setFieldValue,
        isValidating,
        isSubmitting,
    } = useFormikContext()
    const cart = useCart()

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

    const isLoading = !isValidating && isSubmitting

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
                        <tr>
                            <td>Subtotal:</td>
                            <td>{` ${formatCurrency(subTotal)}`}</td>
                        </tr>
                        {discount !== 0 && (
                            <>
                                <tr>
                                    <td>Discount:</td>
                                    <td>{` ${formatCurrency(discount)}`}</td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td>
                                <strong>Total:</strong>
                            </td>
                            <td>{` ${formatCurrency(total)}`}</td>
                        </tr>
                    </tbody>
                </table>
                <Cash loading={paymentMethod === 'CASH' && isLoading} />
                {error && paymentMethod === 'CASH' && (
                    <div style={{ color: 'red' }}>{error}</div>
                )}
                <Paypal loading={paymentMethod === 'PAYPAL' && isLoading} />
                {error && paymentMethod === 'PAYPAL' && (
                    <div style={{ color: 'red' }}>{error}</div>
                )}
            </Segment>
        </>
    )
}
