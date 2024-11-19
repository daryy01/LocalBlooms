import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import ShopPage from './pages/shops/ShopPage.jsx';
import SellerShop from './pages/shops/SellerShop.jsx';
import CartPage from './pages/cart/CartPage.jsx';
import Account from './pages/account/Account.jsx';
import AddShop from './pages/account/AddShop.jsx';
import LandingPage from './pages/landingpage/LandingPage.jsx';
import OrdersPage from './pages/orders/OrdersPage.jsx'; // Import Orders page

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/shops', element: <ShopPage /> },
      { path: '/shop/:sellerId', element: <SellerShop /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/account', element: <Account /> },
      { path: '/add-shop', element: <AddShop /> },
      { path: '/orders', element: <OrdersPage /> }, // Add Orders page route
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
