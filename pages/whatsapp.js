import Head from 'next/head'
import { Header, List } from 'semantic-ui-react'

export default function WhatsApp() {
    return (
        <>
            <Head>
                <title>WhatsApp | Wein Guys</title>
            </Head>
            <Header as="h3">WhatsApp</Header>
            <p>
                Reach out to either of the following people via WhatsApp to
                answer any of your questions.
            </p>
            <List bulleted>
                <List.Item>Luke (+49 421 16159726)</List.Item>
                <List.Item>Torben (+49 1512 8132213)</List.Item>
            </List>
        </>
    )
}
