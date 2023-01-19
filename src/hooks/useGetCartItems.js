import { useQuery } from 'react-query';
import axios from '../axios';
import { useCookies } from 'react-cookie';
const useGetCartItems = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const getCartItems = async () => {
		const config = {
			method: 'get',
			url: '/cart',
			headers: {
				Authorization: 'Bearer ' + cookie?.user?.token,
			},
		};
		const response = await axios(config);
		const cartItems = response.data?.cartItems;
		return cartItems;
	};
	const formatData = (data) => {
		const totalAmount = data.reduce((acc, item) => {
			return acc + item.product.price * item.quantity;
		}, 0);
		console.log(totalAmount);
		return {
			cartItems: data,
			totalAmount,
		};
	};
	return useQuery(['cart'], getCartItems, {
		select: formatData,
		enabled: !!cookie?.user?.token,
	});
};

export default useGetCartItems;
