import { Center, Image } from '@chakra-ui/react';
export default function Header(props: { logo: string }) {
    return <Center id="logoBox" w={'full'}>
        <Image id="app-logo" alt="Trivial Endeavor logo" src={props.logo} w={{ base: '90%', sm: '50%' }} />
    </Center>
}