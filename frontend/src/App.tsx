import { Router } from './Router';

import '@mantine/core/styles.css';

import {
    MantineProvider,
} from '@mantine/core';

export default function App() {
    return (
        <MantineProvider defaultColorScheme='dark'>
            <>
                <Router />
            </>
        </MantineProvider>
    );
}