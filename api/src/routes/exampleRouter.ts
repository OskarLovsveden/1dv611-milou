import { Router } from "express";
import ExampleController from "../controllers/exampleController";
import { IRouter } from "../interfaces/IRouter";


export default class ExampleRouter implements IRouter {
    expressRouter: Router = Router()
    controller: ExampleController = new ExampleController()
    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.expressRouter.get('/', 
            (req, res, next) => this.controller.index(req, res, next)
        )
    }

}