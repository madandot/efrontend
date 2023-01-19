import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
const CartEmpty = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className=' bg-blue-200 p-5 rounded-full inline-block'>
					<FaShoppingCart className=' text-4xl' />
				</div>
				<p>Your cart is empty</p>
			</div>
		</div>
	);
};

export default CartEmpty;
