import { useQuery } from 'react-query';
import axios from '../../axios';
import { useCookies } from 'react-cookie';

const useGetWishlist = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const getWishlist = async () => {
		var config = {
			method: 'get',
			url: '/wishlist',
			headers: {
				Authorization: 'Bearer ' + cookie?.user?.token,
			},
		};

		const response = await axios(config);

		return response.data?.wishlistItems;
	};
	return useQuery('wishlist', () => getWishlist(), {
		enabled: !!cookie?.user?.token,
	});
};

export default useGetWishlist;
