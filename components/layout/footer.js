import Link from 'next/link'
import {
    Segment,
    Container,
    Grid,
    List,
    Header,
    Divider,
} from 'semantic-ui-react'

export default function Footer() {
    return (
        <>
            <Divider style={{ marginTop: '2em' }} />
            <Segment vertical>
                <Container text>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header as="h4" content="About" />
                                <List>
                                    <List.Item>
                                        <Link href="/privacy">Privacy</Link>
                                    </List.Item>
                                    <List.Item>
                                        <Link href="/terms">Terms</Link>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header as="h4" content="Services" />
                                <List>
                                    <List.Item>
                                        <Link href="/">Our Products</Link>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as="h4">Contact Us</Header>
                                <p>
                                    It's wine o'clock somewhere! What are you
                                    waiting for?
                                </p>
                                <List horizontal style={{ display: 'flex' }}>
                                    <List.Item style={{ display: 'flex' }}>
                                        <List.Icon name="instagram" />
                                        <Link
                                            href="https://instagram.com/weinguys"
                                            alt="instagram link"
                                        >
                                            Instagram
                                        </Link>
                                    </List.Item>
                                    <List.Item style={{ display: 'flex' }}>
                                        <List.Icon name="whatsapp" />
                                        <Link
                                            href="https://whatsapp.com"
                                            alt="whatsapp link"
                                        >
                                            WhatsApp
                                        </Link>
                                    </List.Item>
                                    <List.Item style={{ display: 'flex' }}>
                                        <List.Icon name="mail" />
                                        <Link
                                            href="mailto:contact@weinguys.com"
                                            alt="email link"
                                        >
                                            Email
                                        </Link>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column
                                width={16}
                                style={{ textAlign: 'center' }}
                            >
                                Copyright &copy;{' '}
                                <Link href="https://weinguys.com">
                                    Wein Guys
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column
                                width={16}
                                style={{ textAlign: 'center' }}
                            >
                                {'Website by '}
                                <Link href="https://github.com/luke-rucker">
                                    Luke Rucker
                                </Link>
                                {'.'}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}
