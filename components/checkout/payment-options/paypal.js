import { Button, Icon } from 'semantic-ui-react'
import { useFormikContext } from 'formik'

export default function Paypal({ setError, loading }) {
    const { setFieldValue } = useFormikContext()

    return (
        <Button
            color="blue"
            type="submit"
            loading={loading}
            style={{ width: '100%', marginBottom: '1em' }}
            onClick={() => {
                setError('')
                setFieldValue('paymentMethod', 'PAYPAL', 0)
            }}
        >
            <Icon name="paypal" />
            Pay with Paypal
        </Button>
    )
}
