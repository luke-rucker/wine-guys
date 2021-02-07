import { Form } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-react'

export function validateFirstName(value) {
    if (!value) {
        return 'Enter a First Name.'
    }
    return
}

export function validateLastName(value) {
    if (!value) {
        return 'Enter a Last Name.'
    }
    return
}

export function validateEmail(value) {
    if (!value) {
        return 'Enter an Email.'
    }
    return
}

export function validatePhoneNumber(value) {
    if (!value) {
        return 'Enter a Phone Number.'
    }
    return
}

export default function ContactForm() {
    return (
        <>
            <h4>Contact Information</h4>
            <Form.Group widths="equal">
                <Input
                    name="contact.firstName"
                    label="First Name"
                    placeholder="First Name"
                    errorPrompt
                    validate={validateFirstName}
                />
                <Input
                    name="contact.lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    errorPrompt
                    validate={validateLastName}
                />
            </Form.Group>
            <Input
                name="contact.email"
                label="Email"
                placeholder="Email"
                errorPrompt
                validate={validateEmail}
            />
            <Input
                name="contact.phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                errorPrompt
                validate={validatePhoneNumber}
            />
        </>
    )
}
