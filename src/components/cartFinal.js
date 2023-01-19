import { Link } from 'react-router-dom';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
const CartFinal = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className='p-2 border-2 border-primary rounded-full inline-block'>
					<AiOutlineCheck className=' text-5xl' />
				</div>
				<p className=' mt-4 text-2xl font-medium'>Order placed successfully</p>
				<Link
					to='/collections/all'
					className=' w-full mt-5 py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
					replace
				>
					continue shopping
				</Link>
			</div>
		</div>
	);
};

export default CartFinal;
