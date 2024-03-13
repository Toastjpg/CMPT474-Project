import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home_page';
import { LoginPage } from './pages/login_page';
import { RegisterPage } from './pages/register_page';
import { AuthPage } from './pages/auth_page';

const router = createBrowserRouter([
    {
        path: '/loginpage',
        element: <LoginPage />,
    },
    {
        path: '/registerpage',
        element: <RegisterPage />,
    },
    {
        path: '/homepage',
        element: <HomePage />,
    },
    {
        path: '/authpage',
        element: <AuthPage />,
    },
    {
        path: '/',
        element: <LoginPage />,
    }
]);

export function Router() {
    return (
        <RouterProvider 
            router = {router}
        />
    );
}