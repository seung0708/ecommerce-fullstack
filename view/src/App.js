import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { getAllProducts } from './api/products'
import {loginUser, logoutUser, registerUser} from './api/auth'
import {addToCart, fetchCart, updateCartItems, deleteCartItem} from './api/carts'
import {createOrder} from './api/orders'
import { stripeCheckout} from './api/payment';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SellerHomePage from './sellers/pages/Home';
import CutomerHomePage from './customers/pages/Home'
import Header from './components/Header'
import ProductDetails from './customers/pages/ProductDetails';
import Login from './customers/pages/Login';
import Register from './customers/pages/Register';
import Cart from './customers/pages/Cart';
import Order from './customers/pages/Order';


function App() {
  const [isSeller, setIsSeller] = useState(false);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  //For sellers website
  useEffect(() => {
    setIsSeller(window.location.hostname === 'seller.localhost')
  },[])

  //Storing user into local storage
  //Need to figure out how to do this in the session on the backend
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    //console.log(storedUser)
    if (storedUser) {
        setUser(JSON.parse(storedUser)); 
    }
  }, []);

  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  },[])

  //Fetch all products from backend
  useEffect(() =>{
    const fetchAllProducts = async() => {
      //console.log('fetchAllProducts')
      try {
        const data = await getAllProducts();
        setAllProducts(data)
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchAllProducts();
  },[])

//Fetching users cart from the backend 
  useEffect(() => {
    const getCart = async () => {
      if(user) {
        const cartData = await fetchCart(user.id)
        setCart(cartData.cart)
      }
    }
    getCart() 
  },[user])

  //Searching products
  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter(product => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    console.log(searchTerm)
    setAllProducts(filtered);
  }

  //Register
  const register = async(firstName, lastName, email, password) => {
      let registeredUser
      let role;
      if(!isSeller) {
        role = 'customer'
        registeredUser = await registerUser(firstName, lastName, email, password, role);
        navigate('/login')
      }
  }

  //Login
  const login = async(email, password) => {
    console.log(email, password)
    const fetchedUser = await loginUser(email, password);
    //console.log(fetchedUser.user)
    if (fetchedUser) {
      setUser(fetchedUser)
      localStorage.setItem('user', JSON.stringify(fetchedUser));
      navigate('/');
    }
  }

  const logout = async () => {
    try {
      await logoutUser() 
      setUser(null)
      localStorage.removeItem('user')
      navigate('/')
    } catch(error) {
      console.error('Logout fail', error)
    }
  }


  //Cart Functionality
  const handleAddToCart = async(productId, quantity = 1) => {
      console.log(productId, quantity)
      const selectedProduct = allProducts.find(product => product.id === productId);
      const createdCart = await addToCart(user.id, selectedProduct.id, quantity)  
      //console.log(createdCart)
      setCart(createdCart)
  }

  const handleUpdateCartItems = async(cartItemId, updatedItems) => {
    try{
      await updateCartItems(cartItemId, updatedItems);      
      setCart(prevCart => prevCart.map(item => updatedItems.find(updatedItem => updatedItem.id === item.id) || item))
    } catch(error) {
      console.error('Failed to update cart items: ', error)
    }
    
  } 

  const handleDeleteCartItem = async(cartItemId) => {
    console.log(cartItemId)
    await deleteCartItem(cartItemId);
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  }
  
  //Orders
  const handleCreateOrders = async () => {
    const userId = user.id
    const cartData = await fetchCart(userId);

    const orderData = await createOrder(userId, cartData.cartId)
    localStorage.setItem('order', JSON.stringify(orderData))
  }
  
  //Payments 
  const handleCreateStripeCheckout = async(methodType) => {
    const currentOrder = order[1] 
    const orderItems = order[0]
    await stripeCheckout(user.id, currentOrder, orderItems, methodType)
    localStorage.removeItem('order', order)
    setOrder([])
    setCart([]);
  }

  return (
    <>
      {!isSeller && location.pathname !== '/order' && (<Header user={user} logoutUser={logout} cart={cart} onSearch={handleSearch} />)}
      <Routes>
       {isSeller ? (
        <>
          <Route path='/' element={<SellerHomePage />} />
        </>
       ) : (
        <>
          <Route path='/' element={<CutomerHomePage products={allProducts} onAddToCart={handleAddToCart}/>} />
          <Route path='/login' element={<Login loginUser={login}/>} />
          <Route path ='/register' element={<Register registerUser={register}  />} />
          <Route path='/productDetails' element={<ProductDetails onAddToCart={handleAddToCart} />}/>
          <Route 
            path='/cart' 
            element={<Cart user={user} cart={cart} onUpdate={handleUpdateCartItems} onDelete={handleDeleteCartItem} onOrder={handleCreateOrders}/>} />
          <Route path='/order' element={<Order order={order} onCheckout={handleCreateStripeCheckout} />} />
        </>
       )
      }
      </Routes>
    </>
  );
}

export default App;
