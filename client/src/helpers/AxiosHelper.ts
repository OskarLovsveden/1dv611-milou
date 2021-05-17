import axios from 'axios';
import Cookie from './Cookie';

export default class AxiosHelper {
    private cookie: Cookie

    constructor () {
        this.cookie = new Cookie('token');
    }

    // POST request using the current JWT
    async post(url: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method: 'POST',
                url: url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                },
                data: data
            });
            
            return response;
        } catch (error) {
            console.log(error.response, 'error axios POST');
            return error.response;
        }
        
    }

    async update(url: string, data?: any): Promise<any> {
        try {
            console.log(data, 'axios put');
            const response = await axios({
                method: 'PUT',
                url: url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                },
                data: data
            });
            
            return response;
        } catch (error) {
            console.log(error.response, 'error axios PUT (update)');
            return error.response;
        }
        
    }
    
    // GET request using the current JWT
    async get(url: string) {
        try {
            const response = await axios({
                method: 'GET',
                url: url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                }
            });
            
            return response;
        } catch (error) {
            console.log(error.response, 'error axios GET');
            return error.response;
        }
    }
    async delete(url: string) {
        try {
            const response = await axios({
                method: 'DELETE',
                url: url,
                headers: {
                    authorization: 'Bearer ' + this.cookie.get()
                }
            });
            
            return response;
        } catch (error) {
            console.log(error.response, 'error axios DELETE');
            return error.response;
        }
    }
}