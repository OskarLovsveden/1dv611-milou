import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import AuthController from '../controllers/authController';

export default class AuthRouter implements IRouter {
    private controller: AuthController = new AuthController()
    private middleware: AuthMiddleware = new AuthMiddleware()
    
    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        /**
         * @swagger
         * /login:
         *   post:
         *     summary: Log in a user.
         *     tags:
         *       - auth
         *     description: Log in a specified user.
         *     operationId: LogInUser
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
         *       description: Log in user
         *       required: true
         *     responses:
         *       200:
         *         description: User logged in.
         *       400:
         *         description: Missing/invalid format of Email and/or Password.
         *       401:
         *         description: Invalid email or password.
         */
        this.router.post('/login', 
            (req, res, next) => this.middleware.requestIncludesEmail(req, next),
            (req, res, next) => this.middleware.requestIncludesPassword(req, next),
            (req, res, next) => this.controller.login(req, res, next)
        );
    }
}