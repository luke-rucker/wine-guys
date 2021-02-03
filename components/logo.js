import Image from 'next/image'

export default function Logo() {
    return (
        <Image src="/logo.svg" layout="responsive" height={150} width={500} />
    )
}
