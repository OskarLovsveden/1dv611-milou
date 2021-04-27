import { Router } from 'express';
import UserController from '../controllers/userController';
import { IRouter } from '../interfaces/IRouter';
import UserMiddleware from '../middleware/userMiddleware';

export default class UserRouter implements IRouter {
    expressRouter: Router = Router()
    controller: UserController = new UserController()
    middleware: UserMiddleware = new UserMiddleware()
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Add a new user.
         *     tags:
         *       - users
         *     description: Registers a new user.
         *     operationId: createUser
         *     parameters:
         *       - name: email
         *         in: body
         *         description: Email that the user supplies
         *         required: true
         *       - name: password
         *         in: body
         *         description: Password that the user supplies
         *         required: true
         *     requestBody:
         *       content:
         *         application/json:
         *       description: Create user
         *       required: true
         *     responses:
         *       201:
         *         description: User created.
         *       400:
         *         description: Missing or invalid format of Email and/or Password.
         *       409:
         *         description: This email is already registered.
         */
        this.expressRouter.post('/',
            (req, res, next) => this.middleware.validateRequestData(req, next), 
            (req, res, next) => this.controller.register(req, res, next)
        );
    }

}