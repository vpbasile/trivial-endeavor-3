import { Button } from '@chakra-ui/react';
import { dispatchType } from '../gameReducer';
export default function DevModeButton(props: { devMode: boolean, dispatch: dispatchType }) {
    const toggle_dev_mode = () => props.dispatch({ type: 'toggle_dev_mode' });

    return <Button id="devModeToggle" w={'100%'} onClick={toggle_dev_mode}>
        {props.devMode ? <>{"Dev Mode is On"}</> : <>{"Dev Mode is Off"}</>}
    </Button>
}