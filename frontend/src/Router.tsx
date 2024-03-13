import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home_page';
import { LoginPage } from './pages/login_page';

const router = createBrowserRouter([
    {
        path: '/loginpage',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <HomePage />,
    }
]);

export function Router() {
    return (
        <RouterProvider 
            router = {router}
        />
    );
}