import { Button, Stack, useColorModeValue } from '@chakra-ui/react';
import ColorModeButton from '../helpers/ColorModeButton';
import { categoryList } from '../helpers/queryTheTrivia';
export default function ColorTest() {
    const fg = useColorModeValue('dark', 'light');
    const bg = useColorModeValue('light', 'dark');
    return (<>
        <Stack>
            <ColorModeButton />
            <Button>Display Only</Button>
            
        </Stack>
        <Stack>
            <Button bg={'gold' + '.' + bg}>Gold</Button>
            <Button bg={'silver' + '.' + bg}>Silver</Button>
            <Button bg={'bronze' + '.' + bg}>Bronze</Button>
        </Stack>
        <Stack>
            <Button bg={'correct' + '.' + bg} color={'correct' + '.' + fg}>Correct</Button>
            <Button bg={'incorrect' + '.' + bg} color={'incorrect' + '.' + fg}>Incorrect</Button>
        </Stack>
        <Stack>
            {categoryList.map((category) => <>
                <Button bg={category.queryTag + '.' + bg} color={category.queryTag + '.' + fg}>{category.title}</Button>
            </>)}
        </Stack>
        <Stack>
            {categoryList.map((category) => <>
                <Button bg={category.queryTag + '.' + fg} color={category.queryTag + '.' + bg}>{category.title}</Button>
            </>)} </Stack>
        {/* Now I want a button with a transparent blue background and blck text, syaing "Glass" */}
        <Button bg='blueGlass' color='black'>Glass</Button>
    </>);
}