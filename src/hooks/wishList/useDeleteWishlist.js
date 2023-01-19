import { useMutation, useQueryClient } from 'react-query';
import axios from '../../axios';
import { useCookies } from 'react-cookie';
const useDeleteWishlist = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const queryClient = useQueryClient();
	const deleteWishlist = async (product) => {
		var config = {
			method: 'delete',
			url: `wishlist/${product}`,
			headers: {
				Authorization: 'Bearer ' + cookie?.user?.token,
			},
		};

		const response = await axios(config);
		return response.data;
	};
	return useMutation(deleteWishlist, {
		onMutate: (data) => {
			queryClient.cancelQueries(['wishlist']);
			const wishlist = queryClient.getQueryData('wishlist');

			if (wishlist) {
				const newWishlist = wishlist.filter((item) => item.id !== data);
				queryClient.setQueryData('wishlist', newWishlist);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries('wishlist');
		},
	});
};

export default useDeleteWishlist;
