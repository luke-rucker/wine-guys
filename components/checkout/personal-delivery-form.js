import { useFormikContext } from 'formik'
import { Select, Input } from 'formik-semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { makeSelectOptions } from '../../util'

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
        values: { college },
    } = useFormikContext()

    return (
        <>
            <p>
                Enter the location and time you would like to recieve your order
                and we will deliver it to you at no extra cost.
            </p>
            <Form.Group widths="equal">
                <Select name="college" label="College" options={colleges} />
                <Select
                    name="block"
                    label="Block"
                    options={
                        blocks[college] || [{ key: '-', value: '-', text: '-' }]
                    }
                />
            </Form.Group>
            <Input
                name="roomNumber"
                label="Room Number"
                placeholder="Room Number"
                errorPrompt
                validate={value =>
                    !/[0-5][0-9][0-9]$/.test(value) || value.length !== 3
                        ? 'Enter a valid room number.'
                        : ''
                }
            />
        </>
    )
}
