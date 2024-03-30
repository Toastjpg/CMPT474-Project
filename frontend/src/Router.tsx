import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home_page';
import { RegisterPage } from './pages/register_page';

// FIXME might need to refactor the way routers are defined here to allow for auth route guarding

const router = createBrowserRouter([
    {
        path: '/homepage',
        element: <HomePage />,
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