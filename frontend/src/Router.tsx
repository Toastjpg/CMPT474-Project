import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home_page';
import { RegisterPage } from './pages/register_page';
import { AuthPage } from './pages/auth_page';

const router = createBrowserRouter([
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
        element: <RegisterPage />,
    },
    {
        path: '*',
        element: <RegisterPage />, // redirect to root/ instead of displaying on whildcard
    }

]);

export function Router() {
    return (
        <RouterProvider 
            router = {router}
        />
    );
}