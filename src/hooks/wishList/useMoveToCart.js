import { useMutation, useQueryClient } from 'react-query';
import axios from '../../axios';

const useMoveToCart = () => {
	const queryClient = useQueryClient();
	const moveToCart = async ({ cartItem, token, wishlistId }) => {
		const config = {
			method: 'post',
			url: `/wishlist/${wishlistId}`,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: cartItem,
		};
		await axios(config);
	};
	return useMutation(moveToCart, {
		onSuccess: async () => {
			queryClient.invalidateQueries('cartQuantity');
			queryClient.invalidateQueries('wishlist');
			queryClient.invalidateQueries('cart');
		},
	});
};

export default useMoveToCart;
