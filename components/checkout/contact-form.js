import { Form } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-react'

export default function ContactForm() {
    return (
        <>
            <h4>Contact Information</h4>
            <Form.Group widths="equal">
                <Input
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                />
                <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                />
            </Form.Group>
            <Input name="email" label="Email" placeholder="Email" />
            <Input
                name="phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
            />
        </>
    )
}
