import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

import '@mantine/core/styles.css';
import './App.css';


export default function App() {
    return (
        <MantineProvider>
            <>
                <Router />
            </>
        </MantineProvider>
    );
}