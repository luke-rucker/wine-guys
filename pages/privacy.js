import Head from 'next/head'
import { Header, List } from 'semantic-ui-react'

export default function Privacy() {
    return (
        <>
            <Head>
                <title>Privacy | Wein Guys</title>
            </Head>
            <Header as="h3">Privacy</Header>
            <Header as="h5">Data Collection</Header>
            <p>
                Wein Guys uses forms on this site. These forms require users to
                give contact information:
            </p>
            <List bulleted>
                <List.Item>Name</List.Item>
                <List.Item>Email</List.Item>
                <List.Item>Phone Number</List.Item>
                <List.Item>Room Number</List.Item>
            </List>
            <p>
                Contact information from the checkout form is used only to
                fulfill the delivery of items ordered and will not be sold to
                another party.
            </p>
            <Header as="h5">Privacy Statement Revisions</Header>
            <p>
                This Privacy Statement was last revised on February 8th 2021. We
                may change this Privacy Statement at any time and for any
                reason. We encourage you to review this Privacy Statement each
                time you visit the web site. If we make a significant change to
                our Privacy Statement, we will post a notice on the homepage of
                our web site for a period of time after the change is made.
            </p>
            <Header as="h5">Responsibility for External Sites</Header>
            <p>
                This website may contain links to other web sites. Some of those
                web sites may be operated by third parties. We provide the links
                for your convenience, but we do not review, control, or monitor
                the privacy practices of web sites operated by others. We are
                not responsible for the performance of web sites operated by
                third parties or for your business dealings with them.
                Therefore, whenever you leave this web site we recommend that
                you review each web site's privacy practices and make your own
                conclusions regarding the adequacy of these practices.
            </p>
        </>
    )
}
