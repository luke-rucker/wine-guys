import { Header, Divider, List } from 'semantic-ui-react'

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
        </>
    )
}
