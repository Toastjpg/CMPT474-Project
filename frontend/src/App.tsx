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

import ProtectedRoute, { ProtectedRouteProps } from './components/auth_components/ProtectedRoute';
import { AuthenticationPage } from './pages/authentication_page';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticationPath: '/authenticate',
};
  
export default function App() {
    return (
        <MantineProvider>
            <FirebaseAuthProvider>
                <Routes>
                    {/* put private routes here */}
                    <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage/>}/>}>
                        <Route index path="/dashboard" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Dashboard/>}/>} />
                        <Route path="/courses" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Courses />}/>}/>
                        <Route path="/courses/:courseId/:tabValue" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Course />}/>}/>
                        <Route path="/progress" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Progress />}/>}/>
                        <Route path="/settings" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Settings />}/>}/>
                        <Route path="/profile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Profile />}/>}/>
                    </Route>

                    {/* put public routes here */}
                    <Route path="/authenticate" element={<AuthenticationPage />} />
                </Routes>
            </FirebaseAuthProvider>
        </MantineProvider>
    );
}