import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

import { FirebaseAuthProvider } from './contexts/AuthContext';

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