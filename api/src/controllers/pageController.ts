import { NextFunction, Request, Response } from 'express';
import PageService from '../services/pageService';

export default class PageController {
    private service: PageService = new PageService()
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pageInfo = await this.service.createPage(req);
            res.status(201).json({
                domain: pageInfo.domain, 
                address: pageInfo.address, 
                path: pageInfo.path
            });
        } catch (error) {
            next(error);
        }
    }
}