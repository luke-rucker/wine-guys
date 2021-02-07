import React from 'react'
import Link from 'next/link'
import { Message } from 'semantic-ui-react'

export default function ThankYou() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Message positive>
                <Message.Header>Thank you for your order.</Message.Header>
                We will be in touch to confirm.
            </Message>
            <Link href="/">Continue Shopping</Link>
        </div>
    )
}
