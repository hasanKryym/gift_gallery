import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Login from './components/login-register/Login';
import SignUp from './components/login-register/SignUp';
import Products from './components/Product/Products';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import Transactions from './components/Profile/Transactions/Transactions';
import WishList from './components/Profile/WishList/WishList';
import AdminPanel from './components/admin/AdminPanel';
import AddProduct from './components/admin/screens/Products/AddProduct';
import ProductsScreen from './components/admin/screens/Products/Products';
import ProductsDetails from './components/admin/screens/Products/ProductsDetails';
import EditProduct from './components/admin/screens/Products/EditProduct';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile/transactions" element={<Transactions />} />
          <Route path="/profile/wishList" element={<WishList />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route
            path="/adminPanel/products/addproduct"
            element={<AddProduct />}
          />
          <Route path="/adminPanel/products" element={<ProductsScreen />} />
          <Route
            path="/adminPanel/products/productsDetails"
            element={<ProductsDetails />}
          />

          <Route
            path="/adminPanel/products/productsDetails/edit/:id"
            element={<EditProduct />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
