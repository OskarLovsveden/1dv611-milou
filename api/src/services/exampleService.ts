import { NextFunction } from "express";
const e = 'example'

export interface User {
    fullname: string
    firstname: string
    lastname: string
}

export default class ExampleService {

    public async getExample(next: NextFunction): Promise<string> {
        // call db
        // Do map/filter stuff
        //return result
        return e + ' test'
    }

    public async createExample(req: any, next: NextFunction): Promise<User> {
        const { firstname, lastname } = req.body
        console.log(`${firstname} ${lastname}`)
        const user: User = {
            firstname,
            lastname,
            fullname: `${firstname} ${lastname}`
        }
        return user
    }
}