import { Link } from 'react-router-dom';
import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
const SigninRequest = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className=' bg-gray-100 p-4 rounded-full inline-block'>
					<FaRegUserCircle className=' text-3xl' />
				</div>
				<div className='pt-6 space-y-5'>
					<p className=' text-2xl font-semibold'>Please Sign In</p>
					<p>Sign In to view items in your wishlist</p>
					<Link to='/login'>
						<button className=' mt-5 w-full cursor-pointer  rounded-md font-medium shadow text-white bg-gradient-to-r from-secondary to-primary py-3'>
							Sign In
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SigninRequest;
