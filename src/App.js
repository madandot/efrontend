import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Index';
import Login from './pages/login';
import Signup from './pages/signUp';
import Collections from './pages/collections/Collections';
import Cart from './pages/cart/Cart';
import WishList from './pages/wishList/WishList';
function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/collections/:collectionId' element={<Collections />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/wishlist' element={<WishList />} />
			</Routes>
		</div>
	);
}

export default App;
