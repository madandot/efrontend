import React from 'react';
import useGetCartItems from '../../hooks/useGetCartItems';
import CartEmpty from '../../components/cartEmpty';
import SigninRequest from '../../components/SigninRequest';
import { useCookies } from 'react-cookie';
import Spinner from '../../components/Spinner';
import { AiOutlineClose } from 'react-icons/ai';
import { getFormattedCurrency } from '../../utils/getFormattedCurrency';
import useDeleteCart from '../../hooks/useDeleteCart';
import CartFinal from '../../components/cartFinal';
import useDeletedCartItem from '../../hooks/useDeletedCartItem';

const Cart = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const { status, mutate, isLoading } = useDeleteCart();
	const { data, isSuccess, isLoading: cartLoading, isError, error } = useGetCartItems();
	const deletedCartItem = useDeletedCartItem();

	const calculateDiscount = (totalAmount) => {
		const discount = Math.round(totalAmount * 0.15);
		return getFormattedCurrency(discount);
	};
	const finalAmount = (totalAmount) => {
		const discount = Math.round(totalAmount * 0.15);
		const finalAmount = totalAmount - discount;
		return getFormattedCurrency(finalAmount);
	};
	if (cartLoading) {
		return (
			<div className='  flex justify-center items-center min-h-screen'>
				<Spinner size={'h-10 w-10'} color={'text-primary'} />
			</div>
		);
	}

	if (data?.cartItems.length === 0 && status !== 'success') return <CartEmpty />;
	if (!cookie.user) return <SigninRequest />;
	if (status === 'success') return <CartFinal />;

	const onPurchase = () => {
		mutate();
	};
	return (
		<section className=' py-10  px-5 xl:px-0 bg-gray-300 min-h-screen'>
			{isSuccess && (
				<div className=' max-w-6xl mx-auto '>
					<div className=' flex  space-x-10'>
						<div className='max-w-xl shrink-0 grow'>
							<p className=' text-lg font-bold'>Cart</p>
							<div className=' grid grid-cols-1 mt-5 gap-y-5 w-full '>
								{data?.cartItems.map((item) => {
									return (
										<div key={item.id} className=' flex bg-white p-2 rounded space-x-3'>
											<div className=' shrink-0'>
												<img src={item.product.image} alt='' className=' w-40' />
											</div>
											<div className=' mt-3 space-y-2 w-full'>
												<div className=' flex justify-between items-center w-full'>
													<p className=' text-lg font-semibold'>{item.product.name}</p>
													<div
														className='  cursor-pointer  mr-10'
														onClick={() => {
															deletedCartItem.mutate(item.id);
														}}
													>
														<AiOutlineClose className=' text-lg' />
													</div>
												</div>
												<p className=' bg-gray-300 inline-block py-1 px-3 rounded'>Quantity: {item.quantity}</p>
												<p>
													{item.quantity} x Rs.{getFormattedCurrency(item.product.price)}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className=' grow'>
							<p className=' text-lg font-bold'>Price details</p>
							<div className=' max-w-[250px] bg-white space-y-3 px-3 py-2 rounded mt-5'>
								<div className=' flex w-full justify-between  items-center'>
									<p>Price</p>
									<p>Rs. {getFormattedCurrency(data?.totalAmount)}</p>
								</div>
								<div className='flex justify-between'>
									<p>Discount</p>
									<p>- Rs. {calculateDiscount(data?.totalAmount)}</p>
								</div>
								<div className=' flex w-full justify-between  items-center'>
									<p>Shipping</p>
									<p>FREE</p>
								</div>
								<hr className=' mt-5' />
								<div className=' flex font-medium justify-between mt-4'>
									<p>Total Amount</p>
									<p>Rs. {finalAmount(data?.totalAmount)}</p>
								</div>
								<button
									className=' w-full mt-5 py-3 text-center flex justify-center items-center bg-gradient-to-r  from-secondary hover:from-primary to-primary hover:to-secondary rounded-md text-white font-medium'
									onClick={onPurchase}
								>
									{isLoading ? <Spinner /> : 'Place Order'}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Cart;
