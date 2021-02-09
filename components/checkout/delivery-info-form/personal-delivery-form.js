import { useFormikContext } from 'formik'
import { Select, Input } from 'formik-semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { makeSelectOptions } from '../../../util'

const colleges = makeSelectOptions([
    'Krupp',
    'Mercator',
    'College 3',
    'Nordmetall',
])

const blocks = {
    Krupp: makeSelectOptions(['A', 'B', 'C', 'D', 'E', 'F']),
    Mercator: makeSelectOptions(['A', 'B', 'C', 'D']),
    'College 3': makeSelectOptions(['A', 'B', 'C', 'D', 'E']),
    Nordmetall: makeSelectOptions(['A', 'B', 'C', 'D']),
}

export default function PersonalDeliveryForm() {
    const {
        values: {
            personalDelivery: { college },
        },
    } = useFormikContext()

    return (
        <>
            <p>
                Enter the location and time you would like to recieve your order
                and we will deliver it to you at no extra cost.
            </p>
            <Form.Group widths="equal">
                <Select
                    name="personalDelivery.college"
                    label="College"
                    options={colleges}
                />
                <Select
                    name="personalDelivery.block"
                    label="Block"
                    options={
                        blocks[college] || [{ key: '-', value: '-', text: '-' }]
                    }
                />
            </Form.Group>
            <Input
                name="personalDelivery.roomNumber"
                label="Room Number"
                placeholder="Room Number"
                errorPrompt
                validate={value => {
                    if (!value) {
                        return 'Enter a Room Number.'
                    }
                    if (!/[0-6][0-9][0-9]$/.test(value) || value.length !== 3) {
                        return 'Enter a valid room number.'
                    }
                }}
            />
            <Form.Group widths="equal">
                <Input
                    name="personalDelivery.date"
                    label="Date"
                    type="date"
                    disabled={true}
                />
                <Input
                    name="personalDelivery.time"
                    label="Delivery Time"
                    type="time"
                    step={60 * 15} // 15 min
                    min="17:00"
                    max="22:00"
                />
            </Form.Group>
            <p>
                We are currently only accepting orders delivered on February
                14th from 5:00 PM to 10:00 PM. Please allow for a 15 minute
                discrepancy in actual delivery time.
            </p>
        </>
    )
}
