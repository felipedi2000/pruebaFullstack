import axios from "axios";


class UserService{

	static USER_BASE_API_URL = 'http://localhost:8181/api/user';

  	autentificateUser(loginDto){
		return axios.post(`${UserService.USER_BASE_API_URL}/login`, loginDto)
		.then(response => response.data)
		.catch(error => {
			console.error("Error during login:", error.response || error.message);
			throw error;
		});
	}

	saveUser(userDto){
		return axios.post(`${UserService.USER_BASE_API_URL}/save`, userDto)
		.then(response => response.data)
		.catch(error =>{
			console.error("Error", error.response || error.message);
		});
	}
}

export default new UserService();