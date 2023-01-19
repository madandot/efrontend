import React from 'react';
import useGetWishlist from '../../hooks/wishList/useGetWishlist';
import Spinner from '../../components/Spinner';
import SigninRequest from '../../components/SigninRequest';
import { useCookies } from 'react-cookie';
import EmptyWishlist from '../../components/EmptyWishlist';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import useDeleteWishlist from '../../hooks/wishList/useDeleteWishlist';
import useMoveToCart from '../../hooks/wishList/useMoveToCart';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);
	const navigate = useNavigate();
	const { status, data: wishlist, isLoading } = useGetWishlist();
	const deleteWishlist = useDeleteWishlist();
	const moveToCart = useMoveToCart();

	const wishlistDeleteHandler = (productId) => {
		deleteWishlist.mutate(productId);
	};
	const addToCartHandler = (productId, wishListId) => {
		if (cookie?.user?.token) {
			const cartItem = {
				product: productId,
				quantity: 1,
			};
			moveToCart.mutate(
				{
					cartItem,
					token: cookie?.user?.token,
					wishlistId: wishListId,
				},
				{
					onSuccess: () => {
						navigate('/cart');
					},
				}
			);
		}
	};
	if (isLoading) {
		return (
			<div className='  flex justify-center items-center min-h-screen'>
				<Spinner size={'h-10 w-10'} color={'text-primary'} />
			</div>
		);
	}
	if (!cookie.user) return <SigninRequest />;
	if (wishlist?.length === 0 && !isLoading) return <EmptyWishlist />;

	return (
		<section className=' py-10  px-5 xl:px-0 bg-gray-300 min-h-screen'>
			{status === 'success' && wishlist && (
				<div className=' max-w-6xl mx-auto '>
					<div className=' grid grid-cols-4'>
						{wishlist.map((item) => {
							return (
								<div key={item.id} className='rounded overflow-hidden bg-white'>
									<div>
										<img src={item.product.image} alt='' />
									</div>
									<div className=' px-4 py-3 space-y-2'>
										<p className=' font-semibold'>{item.product.name}</p>
										<p>Rs. {getFormattedCurrency(item.product.price)}</p>
										<div className=' flex space-x-2'>
											<button
												className=' w-full  py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
												onClick={() => addToCartHandler(item.product.id, item.id)}
											>
												{moveToCart.isLoading ? <Spinner /> : 'Move to Cart'}
											</button>
											<button
												className=' w-full  py-3 text-center flex justify-center items-center bg-gradient-to-r  bg-red-400  rounded-md text-white font-medium'
												onClick={() => wishlistDeleteHandler(item.id)}
											>
												{deleteWishlist.isLoading ? <Spinner /> : 'Remove'}
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</section>
	);
};

export default WishList;
