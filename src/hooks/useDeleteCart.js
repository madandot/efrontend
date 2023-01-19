import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../axios';
import { useCookies } from 'react-cookie';

const useDeleteCart = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);

	const queryClint = useQueryClient();
	const deleteCart = async () => {
		const config = {
			method: 'DELETE',
			url: `/cart`,
			headers: {
				Authorization: `Bearer ${cookie?.user?.token}`,
			},
		};
		await axios(config);
	};
	return useMutation(deleteCart, {
		onSuccess: () => {
			queryClint.invalidateQueries('cart');
		},
	});
};

export default useDeleteCart;
