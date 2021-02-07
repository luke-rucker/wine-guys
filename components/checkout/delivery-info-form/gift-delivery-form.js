import { Form } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-react'
import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePhoneNumber,
} from '../contact-form'

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
                    name="giftRecipient.firstName"
                    label="First Name"
                    placeholder="First Name"
                    errorPrompt
                    validate={validateFirstName}
                />
                <Input
                    name="giftRecipient.lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    errorPrompt
                    validate={validateLastName}
                />
            </Form.Group>
            <Input
                name="giftRecipient.email"
                label="Email"
                placeholder="Email"
                errorPrompt
                validate={validateEmail}
            />
            <Input
                name="giftRecipient.phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                errorPrompt
                validate={validatePhoneNumber}
            />
        </>
    )
}
