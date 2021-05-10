import axios from 'axios'
import Cookie from './Cookie'

export default class AxiosHelper {
    private cookie: Cookie

    constructor () {
        this.cookie = new Cookie('token')
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
            })
            
            return response
        } catch (error) {
            console.log(error.response, 'error axios POST')
            return error.response
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
            })
            
            return response
        } catch (error) {
            console.log(error.response, 'error axios GET')
            return error.response
        }
    }
}