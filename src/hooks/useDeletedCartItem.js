import { useMutation, useQueryClient } from 'react-query';
import axios from '../axios';
import { useCookies } from 'react-cookie';
const useDeletedCartItem = () => {
	const queryClient = useQueryClient();
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const deleteCartItem = async (id) => {
		var config = {
			method: 'delete',
			url: `/cart/${id}`,
			headers: {
				Authorization: 'Bearer ' + cookie?.user?.token,
			},
		};
		await axios(config);
	};
	return useMutation(deleteCartItem, {
		onMutate: async (id) => {
			await queryClient.cancelQueries('cart');
			const previousCartItems = queryClient.getQueryData('cart');
			if (previousCartItems) {
				const newCartItems = previousCartItems.filter((item) => item.id !== id);
				queryClient.setQueryData('cart', newCartItems);
			}
			return { previousCartItems };
		},
		onError: (err, id, context) => {
			if (context) {
				queryClient.setQueryData('cart', context.previousCartItems);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries('cart');
			queryClient.invalidateQueries('cartQuantity');
		},
	});
};

export default useDeletedCartItem;
