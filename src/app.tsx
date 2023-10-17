import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './app.css';
import { routes } from './pages/routes';

const router = createBrowserRouter(routes);

export const App = () => <RouterProvider router={router} />;
