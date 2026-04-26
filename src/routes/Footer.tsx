import { ExternalLinkIcon, QuestionIcon } from '@chakra-ui/icons';
import { Center, Image, Link, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';


export default function Footer(props: { logo: string, version: string }) {

    return <Center display={{ sm: 'flex' }}>
        <VStack id="version" p={5}>
            <Image id="app-logo" src={props.logo} alt="Trivial Endeavor logo" w='300px' borderRadius={'3xl'} px={10} />
            <Text>Version {props.version}</Text>
        </VStack>
        <Center id="links" justifyContent={'center'} p={3}>
            <List>
                <ListItem>
                    <ListIcon as={QuestionIcon} />
                    Using questions from <Link href='https://the-trivia-api.com/'>The Trivia API</Link>
                </ListItem>
                <ListItem>
                    <ListIcon as={ExternalLinkIcon} />
                    <Link href="https://vpbasile.github.io/trivial-endeavor-3" isExternal>Live version</Link>
                </ListItem>
                <ListItem>
                    <ListIcon as={ExternalLinkIcon} />
                    <Link href="https://github.com/vpbasile/trivial-endeavor-3" isExternal>Repository on GitHub</Link>
                </ListItem>
            </List>
        </Center>
    </Center>
}