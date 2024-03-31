import { MantineProvider } from '@mantine/core';

import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';

import '@mantine/core/styles.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Courses } from './pages/courses_page';
import { Dashboard } from './pages/dashboard_page';
import { Settings } from './pages/settings_page';
import { Progress } from './pages/progress_page';
import { Profile } from './pages/profile_page';
import { Course } from './pages/course_page';
import { HomePage } from './pages/home_page';


export default function App() {
    return (
        <MantineProvider>
            <FirebaseAuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} >
                        <Route index path="/dashboard" element={<Dashboard />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/courses/:courseId/:tabValue" element={<Course />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </FirebaseAuthProvider>
        </MantineProvider>
    );
}