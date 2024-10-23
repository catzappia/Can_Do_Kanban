import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Board from './pages/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />
      }, 
      {
        path: '/edit',
        element: <EditTicket />
      },
      {
        path: '/create',
        element: <CreateTicket />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RouterProvider router={router} />
);