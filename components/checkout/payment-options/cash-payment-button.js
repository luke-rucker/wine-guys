import { Icon } from 'semantic-ui-react'
import { SubmitButton } from 'formik-semantic-ui-react'
import { useFormikContext } from 'formik'

export default function CashPaymentButton() {
    const {
        values: { isGift },
        setFieldValue,
    } = useFormikContext()

    return (
        <SubmitButton
            positive
            disabled={isGift}
            style={{ width: '100%' }}
            onClick={() => {
                setFieldValue('paymentMethod', 'CASH', 0)
            }}
        >
            <Icon name="money" />
            Pay with Cash
        </SubmitButton>
    )
}
