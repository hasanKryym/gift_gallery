import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Login from './components/login-register/Login';
import SignUp from './components/login-register/SignUp';
import Products from './components/Product/Products';
import AddProduct from './components/admin/Products/AddProduct';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          {/* <Route path="/product/:id" element={<Product />} /> */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
