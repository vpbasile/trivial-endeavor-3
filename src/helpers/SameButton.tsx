import { Button, useColorModeValue } from "@chakra-ui/react";

export function SameButton(
    props: {
        text: string,
        id?: string,
        key?: string,
        color?: string,
        isDisabled?: boolean,
        leftIcon?: JSX.Element,
        rightIcon?: JSX.Element,
        onClick?: () => void
    }) {
    const { color, leftIcon, rightIcon, isDisabled, onClick, text } = props;
    const fg = useColorModeValue('dark', 'light')
    const bg = useColorModeValue('light', 'dark')
    return (<Button id={props.id} key={props.id}
        w={'100%'} whiteSpace={'normal'}
        py={4} px={2}
        alignContent={'center'}
        borderRadius={'lg'}
        border={isDisabled ? 'none' : '8px'}
        variant={isDisabled ? 'display-only' : 'solid'}
        bg={color + '.' + bg}
        color={color + '.' + fg}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        // isDisabled={isDisabled}
        onClick={onClick} >
        {text}
    </Button >)
}