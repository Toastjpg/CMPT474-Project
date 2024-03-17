import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home_page';
import { RegisterPage } from './pages/register_page';
import { Test } from './pages/test';

const router = createBrowserRouter([
    {
        path: '/homepage',
        element: <HomePage />,
    },
    {
        path: '/test',
        element: <Test />,
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