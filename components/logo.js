import Image from 'next/image'

export default function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="logo"
            layout="responsive"
            height={150}
            width={700}
        />
    )
}
