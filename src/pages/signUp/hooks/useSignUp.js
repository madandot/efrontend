import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import axios from '../../../axios';
const useSignUp = () => {
	const [cookies, setCookie, removeCookie] = useCookies();
	const SignUp = async (data) => {
		const config = {
			method: 'post',
			url: '/user/register',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};
		const response = await axios(config);
		if (response.data.statusCode === 201) {
			// expires in 3 day
			const user = {
				userName: response.data.userName,
				email: response.data.email,
				token: response.data.token,
			};
			removeCookie('user');
			setCookie('user', user, { path: '/', maxAge: 86400 * 3 });
		}
	};
	return useMutation(SignUp);
};

export default useSignUp;
