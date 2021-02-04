import { Container } from 'semantic-ui-react'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Container text>{children}</Container>
            <Footer />
        </>
    )
}
