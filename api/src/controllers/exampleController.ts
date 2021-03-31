import { NextFunction, Request, Response } from 'express';
import { IExample } from '../models/example';
import ExampleService from '../services/exampleService';

export default class ExampleController {
    private service: ExampleService = new ExampleService();
    public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const example = await this.service.getExample(next);

            res.status(200).json(example);
        } catch (error) {
            next(error);
        }
    }

    public async createExample(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            const example: IExample = await this.service.createExample(req, next);

            res.status(200).json(example);
        } catch (error) {
            next(error);
        }
    }
}