import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';

import '@mantine/core/styles.css';
import './App.css';


export default function App() {
    return (
        <MantineProvider>
            <FirebaseAuthProvider>
                <Router />
            </FirebaseAuthProvider>
        </MantineProvider>
    );
}