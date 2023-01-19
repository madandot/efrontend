import { useMutation, useQueryClient } from 'react-query';
import axios from '../../axios';
import { useCookies } from 'react-cookie';
const useAddToWishlist = () => {
	const queryClient = useQueryClient();
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const addToWishlist = async (product) => {
		const data = JSON.stringify({
			product,
		});

		const config = {
			method: 'post',
			url: 'wishlist',
			headers: {
				Authorization: 'Bearer ' + cookie?.user?.token,
				'Content-Type': 'application/json',
			},
			data: data,
		};

		const response = await axios(config);
		return response.data;
	};
	return useMutation(addToWishlist, {
		onSuccess: () => {
			queryClient.invalidateQueries('wishlist');
		},
	});
};

export default useAddToWishlist;
