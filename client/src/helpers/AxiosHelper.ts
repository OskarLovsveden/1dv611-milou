import axios from 'axios';
import Cookie from './Cookie';

export default class AxiosHelper {
    private cookie: Cookie;

    constructor () {
        this.cookie = new Cookie('token');
    }

    // POST request using the current JWT to check if user is authenticated
    async authCheck(url: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method: 'POST',
                url: process.env.VUE_APP_BASE_URL + url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                },
                data: data
            });

            return response;
        } catch (error) {
            if(error.response.status === 403) {
                this.cookie.delete();  
            }

            return error.response;
        }
    }

    // POST request using the current JWT
    async post(url: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method: 'POST',
                url: process.env.VUE_APP_BASE_URL + url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                },
                data: data
            });

            return response;
        } catch (error) {
            if(error.response.status === 403) {
                this.cookie.delete();  
            }

            throw new Error(error.response.data.message.detail);
        }
    }

    async update(url: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method: 'PUT',
                url: process.env.VUE_APP_BASE_URL + url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                },
                data: data
            });

            return response;
        } catch (error) {
            throw new Error(error.response.data.message.detail);
        }
    }

    // GET request using the current JWT
    async get(url: string) {
        try {
            const response = await axios({
                method: 'GET',
                url: process.env.VUE_APP_BASE_URL + url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                }
            });

            return response;
        } catch (error) {
            throw new Error(error.response.data.message.detail);
        }
    }

    async delete(url: string) {
        try {
            const response = await axios({
                method: 'DELETE',
                url: process.env.VUE_APP_BASE_URL + url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                }
            });

            return response;
        } catch (error) {
            throw new Error(error.response.data.message.detail);
        }
    }
}