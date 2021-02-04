import { Icon } from 'semantic-ui-react'

export default function ShoppingCartIcon({ itemCount }) {
    return (
        <div>
            <Icon name="cart" />
            Cart ({itemCount || 0})
        </div>
    )
}
