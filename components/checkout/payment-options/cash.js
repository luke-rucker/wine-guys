import { Button, Icon } from 'semantic-ui-react'
import { useFormikContext } from 'formik'

export default function Cash({ loading }) {
    const {
        values: { isGift },
        setFieldValue,
    } = useFormikContext()

    return (
        <Button
            positive
            type="submit"
            disabled={isGift}
            loading={loading}
            style={{ width: '100%', marginBottom: '1em' }}
            onClick={() => {
                setFieldValue('paymentMethod', 'CASH', 0)
            }}
        >
            <Icon name="money" />
            Pay with Cash
        </Button>
    )
}
