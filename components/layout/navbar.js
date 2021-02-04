import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Menu, Container, Image } from 'semantic-ui-react'

const CartIcon = dynamic(() => import('./cart-icon'), { ssr: false })

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
                        <CartIcon />
                    </Menu.Item>
                </Link>
            </Container>
        </Menu>
    )
}
