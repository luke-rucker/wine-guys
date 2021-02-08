import prisma from '../../../prisma'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'POST':
            const { lineItems, ...orderInfo } = req.body

            const lineItemsWithPrices = await lookupPrices(lineItems)

            let total = lineItemsWithPrices.reduce(
                (acc, lineItem) =>
                    acc +
                    lineItem.quantity * lineItem.productPriceAtSale +
                    lineItem.deposit
                        ? lineItem.deposit.amount
                        : 0,
                0
            )

            // Time crunch solution lol :(
            if (new Date() < new Date('2021-02-13T00:00')) {
                total = total * 0.9
            }

            await prisma.order.create({
                data: {
                    lineItems: {
                        create: lineItemsWithPrices.map(lineItem => {
                            const { deposit, ...rest } = lineItem
                            return {
                                ...rest,
                                depositId: deposit ? deposit.id : null,
                            }
                        }),
                    },
                    total,
                    ...orderInfo,
                },
            })

            res.status(201).json({ total })
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function lookupPrices(lineItems) {
    const productPrices = await prisma.product.findMany({
        where: {
            OR: lineItems.map(lineItem => ({
                id: parseInt(lineItem.productId),
            })),
        },
        select: { id: true, price: true, deposit: true },
    })

    return lineItems.map(lineItem => {
        return {
            ...lineItem,
            productPriceAtSale:
                productPrices[
                    productPrices.findIndex(
                        product => product.id === lineItem.productId
                    )
                ].price,
        }
    })
}
