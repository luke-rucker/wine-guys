import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'

export default function Navbar() {
    const router = useRouter()

    return (
        <Menu size="huge" borderless pointing>
            <Container text>
                <Link href="/">
                    <Menu.Item active={router.pathname === '/'} header>
                        <Image src="/icon.svg" alt="icon" size="mini" />
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

function ShoppingCartIcon({ itemCount }) {
    return (
        <>
            <Icon name="cart" />
            Cart ({itemCount || 0})
        </>
    )
}
