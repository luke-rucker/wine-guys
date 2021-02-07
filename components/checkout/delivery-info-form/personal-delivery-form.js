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
    'College 3': makeSelectOptions(['A', 'B', 'C', 'D']),
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
                    if (!/[0-5][0-9][0-9]$/.test(value) || value.length !== 3) {
                        return 'Enter a valid room number.'
                    }
                }}
            />
        </>
    )
}
