import { useMutation, useQueryClient } from 'react-query';
import axios from '../axios';

const useAddToCart = () => {
	const addToCart = async ({ cartItem, token }) => {
		const config = {
			method: 'post',
			url: '/cart',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: cartItem,
		};
		await axios(config);
	};
	return useMutation(addToCart, {});
};

export default useAddToCart;
