import Image from 'next/image'
import { Grid } from 'semantic-ui-react'

export default function Logo() {
    return (
        <Grid>
            <Grid.Row>
                <Image src="/logo.svg" alt="logo" height={150} width={700} />
            </Grid.Row>
        </Grid>
    )
}
