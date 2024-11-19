import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider

function App() {
  return (
    <CartProvider>  {/* Wrap with CartProvider */}
      <Navbar />
      <Outlet />
    </CartProvider>
  );
}

export default App;
