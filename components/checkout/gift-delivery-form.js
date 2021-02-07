import { Form } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-react'

export default function GiftInfoForm() {
    return (
        <>
            <p>
                Fill out the gift recipients contact information and we will get
                in touch with them for delivery!
            </p>
            <h4>Gift Recipient</h4>
            <Form.Group widths="equal">
                <Input
                    name="recipientFirstName"
                    label="First Name"
                    placeholder="First Name"
                />
                <Input
                    name="recipientLastName"
                    label="Last Name"
                    placeholder="Last Name"
                />
            </Form.Group>
            <Input name="recipientEmail" label="Email" placeholder="Email" />
            <Input
                name="recipientPhoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
            />
        </>
    )
}
