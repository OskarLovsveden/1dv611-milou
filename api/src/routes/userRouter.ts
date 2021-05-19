import { Router } from 'express';
import UserController from '../controllers/userController';
import UserMiddleware from '../middleware/userMiddleware';
import { IRouter } from '../interfaces/IRouter';

export default class UserRouter implements IRouter {
    private controller: UserController = new UserController()
    private middleware: UserMiddleware = new UserMiddleware()
    
    public router: Router = Router()
    
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
         *     parameters:
         *       - name: email
         *         in: body
         *         description: Email that the user supplies.
         *         required: true
         *       - name: password
         *         in: body
         *         description: Password that the user supplies, minimum length of ten characters.
         *         required: true
         *     responses:
         *       201:
         *         description: User created.
         *       400:
         *         description: Missing or invalid format of Email and/or Password.
         *       409:
         *         description: This email is already registered.
         */
        this.router.post('/',
            (req, res, next) => this.middleware.validateRequestData(req, next), 
            (req, res, next) => this.controller.register(req, res, next)
        );
    }

}