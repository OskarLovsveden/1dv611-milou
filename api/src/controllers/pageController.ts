import { NextFunction, Request, Response } from 'express';
import PageService from '../services/pageService';

export default class PageController {
    private service: PageService = new PageService()
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pageInfo = await this.service.createPage(req);
            res.status(201).json(pageInfo);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.service.updatePage(req);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
    
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const domainInfo = await this.service.getDomainPages(req);
            res.status(200).json(domainInfo);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const domainInfo = await this.service.deletePage(req);
            res.status(200).json(domainInfo);
        } catch (error) {
            next(error);
        }
    }
}