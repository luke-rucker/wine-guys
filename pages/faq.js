import React from 'react'
import Head from 'next/head'
import { Header, Accordion, Icon } from 'semantic-ui-react'
import prisma from '../prisma'

export default function Faq({ faqs }) {
    const [activeIndex, setActiveIndex] = React.useState(-1)

    function handleClick(e, titleProps) {
        const { index } = titleProps
        setActiveIndex(activeIndex === index ? -1 : index)
    }

    return (
        <>
            <Head>
                <title>FAQ | Wein Guys</title>
            </Head>
            <Header as="h3">Frequently Asked Questions</Header>
            <Accordion fluid styled>
                {faqs.map((faq, index) => {
                    return (
                        <div key={faq.id}>
                            <Accordion.Title
                                active={activeIndex === index}
                                index={index}
                                onClick={handleClick}
                            >
                                <Icon name="dropdown" />
                                {faq.question}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === index}>
                                {faq.answer}
                            </Accordion.Content>
                        </div>
                    )
                })}
            </Accordion>
        </>
    )
}

export async function getStaticProps() {
    const faqs = await prisma.faq.findMany({ orderBy: { id: 'asc' } })

    return { props: { faqs }, revalidate: 5 }
}
