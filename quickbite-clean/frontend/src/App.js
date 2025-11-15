import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetails from './pages/RestaurantDetails';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderTracking from './pages/OrderTracking';
import ReviewItem from './pages/ReviewItem';
import Review from './pages/Review';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkServerStatus } from './utils/serverCheck';
import preloadImages from './utils/imagePreloader';

function App() {
  const { loading } = useAuth();

  useEffect(() => {
    // Check server status when app loads
    checkServerStatus();
    // Preload common restaurant images
    preloadImages();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders/tracking/:orderId" element={<OrderTracking />} />
            <Route path="/review/:orderId/:itemId" element={<PrivateRoute><ReviewItem /></PrivateRoute>} />
            <Route path="/review/:orderId/:restaurantId" element={<PrivateRoute><Review /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Cart />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;