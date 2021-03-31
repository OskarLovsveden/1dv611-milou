import { Router } from 'express';
import ExampleController from '../controllers/exampleController';
import { IRouter } from '../interfaces/IRouter';
import ExampleMiddleware from '../middleware/exampleMiddleware';


export default class ExampleRouter implements IRouter {
    expressRouter: Router = Router()
    controller: ExampleController = new ExampleController()
    middleware: ExampleMiddleware = new ExampleMiddleware()
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.expressRouter.get('/',
            (req, res, next) => this.middleware.exampleMethod(req, res, next),
            (req, res, next) => this.controller.index(req, res, next)
        );

        this.expressRouter.post('/',
            (req, res, next) => this.middleware.fullnameCheck(req, res, next),
            (req, res, next) => this.controller.createExample(req, res, next)
        );
    }

}