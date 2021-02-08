import { Header, Divider, List } from 'semantic-ui-react'
import { formatCurrency } from '../../util'

export default function ProductDescription({ product }) {
    return (
        <>
            <Header as="h3">About this product</Header>
            <p>{product.description}</p>
            <Divider />
            <Header as="h4">Includes</Header>
            <List bulleted>
                {product.itemsIncluded.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                ))}
            </List>
            {(product.notes.length > 0 || product.deposit) && (
                <>
                    <Divider />
                    <Header as="h4">Notes</Header>
                    <List bulleted>
                        {product.deposit && (
                            <List.Item>
                                {`Includes an additional ${formatCurrency(
                                    product.deposit.amount
                                )} deposit for ${
                                    product.deposit.name
                                }, which will be refunded on the return of ${
                                    product.deposit.name
                                }`}
                            </List.Item>
                        )}
                        {product.notes.map((note, index) => (
                            <List.Item key={index}>{note}</List.Item>
                        ))}
                    </List>
                </>
            )}
        </>
    )
}
