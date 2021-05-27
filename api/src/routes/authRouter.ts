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
         * /api/login:
         *   post:
         *     summary: Log in a user.
         *     tags:
         *       - auth
         *     description: Log in a specified user.
         *     parameters:
         *       - name: email
         *         in: body
         *         description: Email that the user supplies.
         *         required: true
         *       - name: password
         *         in: body
         *         description: Password that the user supplies.
         *         required: true
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
        /**
         * @swagger
         * /api/authenticate:
         *   post:
         *     summary: Authenticate a user.
         *     tags:
         *       - auth
         *     description: Authenticate a specified user.
         *     parameters:
         *       - name: bearer-token
         *         in: header
         *         description: Bearer token that the user supplies.
         *         required: true
         *     responses:
         *       200:
         *         description: Logged in users username.
         *       401:
         *         description: User is not authenticated.
         */
        this.router.post('/authenticate',
            (req, res, next) => this.middleware.isAuthenticated(req, next),
            (req, res, next) => this.controller.isAuthenticated(req, res, next)
        );
    }
}