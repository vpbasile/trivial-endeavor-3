import { Box, useColorMode } from '@chakra-ui/react';
import AppRow from '../helpers/appRow';

import logoBlack from "/trivialEndeavorLogoBlack.svg";
import logoWhite from "/trivialEndeavorLogoWhite.svg";

import packageJson from '../../package.json';

import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';



export default function RootRoute() {
    const currentVersion = packageJson.version;
    console.log(`Beginning rendering of Trivial Endeavor`);
    console.log(`Version ${currentVersion}`);
    const { colorMode } = useColorMode()
    const logo = (colorMode === "dark") ? logoWhite : logoBlack

    return (<Box id="appContainer" maxWidth={'100%'}>
        <AppRow id="head"><Header logo={logo} /></AppRow>
        <AppRow id="body"><Outlet /></AppRow>
        <AppRow id="foot"><Footer logo={logo} version={currentVersion} /></AppRow>
    </Box >)
}