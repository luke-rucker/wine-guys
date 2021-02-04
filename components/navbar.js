import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu, Container } from 'semantic-ui-react'
import ShoppingCartIcon from './shopping-cart-icon'

export default function Navbar() {
    const router = useRouter()

    return (
        <Menu size="huge" borderless pointing>
            <Container text>
                <Link href="/">
                    <Menu.Item active={router.pathname === '/'}>
                        Store
                    </Menu.Item>
                </Link>
                <Link href="/cart">
                    <Menu.Item
                        active={router.pathname === '/cart'}
                        position="right"
                    >
                        <ShoppingCartIcon itemCount={0} />
                    </Menu.Item>
                </Link>
            </Container>
        </Menu>
    )
}
