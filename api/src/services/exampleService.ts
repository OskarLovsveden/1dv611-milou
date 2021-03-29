import { NextFunction } from "express";
const e = 'example'

export default class ExampleService {

    public async getExample(next: NextFunction): Promise<string> {
        // call db
        // Do map/filter stuff
        //return result
        return e + ' test'
    }
}