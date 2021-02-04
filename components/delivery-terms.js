import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

export default function DeliveryTerms() {
    const acceptedDeliveryTerms = localStorage.getItem('acceptedDeliveryTerms')

    // Open if the user has not yet accepted the delivery terms
    const [open, setOpen] = React.useState(!acceptedDeliveryTerms)

    function handleAccept() {
        setOpen(false)
        localStorage.setItem('acceptedDeliveryTerms', true)
    }

    return (
        <Modal size="mini" open={open}>
            <Modal.Header>Delivery Terms</Modal.Header>
            <Modal.Content>
                <p>
                    We only accept orders delivered on the campus of Jacobs
                    University Bremen. If you do not live on campus, your order
                    will not be delivered.
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={handleAccept}>
                    Accept
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
