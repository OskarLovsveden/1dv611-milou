import axios from 'axios'

export default class AxiosHelper {
    private cookieValue: string | undefined

    constructor () {
        // Gets the cookie containing the JWT
        this.cookieValue = document?.cookie?.split('; ')?.find(row => row?.startsWith('token='))?.split('=')[1]
    }

    // Post request using the current JWT
    async post(url: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method: 'POST',
                url: url,
                headers: {
                    authorization: 'Bearer ' + this.cookieValue
                },
                data: data
            })

            return response
        } catch (error) {
            console.log(error.response, 'error axios POST')
            return error.response
        }
        
    }
    
    // Get request using the current JWT
    async get(url: string) {
        try {
            const response = await axios({
                method: 'GET',
                url: url,
                headers: {
                    authorization: 'Bearer ' + this.cookieValue
                }
            })
            
            return response
        } catch (error) {
            console.log(error.response, 'error axios GET')
            return error.response
        }
    }
}