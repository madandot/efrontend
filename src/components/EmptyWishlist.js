import React from 'react';
import { BiHeart } from 'react-icons/bi';

const EmptyWishlist = () => {
	return (
		<div className=' text-center min-h-[70vh] flex justify-center items-center '>
			<div>
				<div className=' bg-blue-200 p-2 rounded-full inline-block'>
					<BiHeart className=' text-3xl' />
				</div>
				<p className=''>Your wishlist is empty</p>
			</div>
		</div>
	);
};

export default EmptyWishlist;
