import { Button, Icon } from 'semantic-ui-react'
import { useFormikContext } from 'formik'

export default function CashPaymentButton() {
    const {
        values: { isGift },
    } = useFormikContext()

    return (
        <Button
            positive
            disabled={isGift}
            style={{ width: '100%' }}
            type="submit"
        >
            <Icon name="money" />
            Pay with Cash
        </Button>
    )
}
