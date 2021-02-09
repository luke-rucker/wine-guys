import React from 'react'
import { useFormikContext } from 'formik'
import { Header, Segment } from 'semantic-ui-react'
import { useCart } from '../../../context/cart-context'
import { formatCurrency } from '../../../util'
import Cash from './cash'
import Paypal from './paypal'

export default function PaymentOptions({
    subTotal,
    discount,
    deposit,
    total,
    error,
    setError,
}) {
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

    const errorMessage =
        (
            <div
                style={{
                    textAlign: 'center',
                    color: 'red',
                    marginBottom: '1em',
                }}
            >
                {error}
            </div>
        ) || null

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
                            <tr>
                                <td>Discount:</td>
                                <td>{` ${formatCurrency(discount)}`}</td>
                            </tr>
                        )}
                        {deposit !== 0 && (
                            <tr>
                                <td>Deposit:</td>
                                <td>{` ${formatCurrency(deposit)}`}</td>
                            </tr>
                        )}
                        <tr>
                            <td>
                                <strong>Total:</strong>
                            </td>
                            <td>{` ${formatCurrency(total)}`}</td>
                        </tr>
                    </tbody>
                </table>
                <Cash
                    setError={setError}
                    loading={paymentMethod === 'CASH' && isLoading}
                />
                {paymentMethod === 'CASH' && errorMessage}
                <Paypal
                    setError={setError}
                    loading={paymentMethod === 'PAYPAL' && isLoading}
                />
                {paymentMethod === 'PAYPAL' && errorMessage}
            </Segment>
        </>
    )
}
