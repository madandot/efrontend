import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);
	const navigate = useNavigate();
	const signOutHandler = () => {
		removeCookie('user');
		navigate('/login');
	};
	return (
		<section className=' bg-[#1e2328] '>
			<div className=' max-w-6xl px-5 xl:px-0 mx-auto h-16 text-lg flex justify-between items-center text-white'>
				<Link to={'/'} className=' text-2xl font-semibold'>
					Lavish
				</Link>

				<div className=' flex items-center space-x-8 font-semibold'>
					<Link to={'/wishlist'}>WishList</Link>
					<Link to={'/cart'}>Cart</Link>
					{cookie.user ? (
						<p onClick={signOutHandler} className=' cursor-pointer'>
							Logout
						</p>
					) : (
						<Link to={'/login'}>Login/SignIn</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default Navbar;
