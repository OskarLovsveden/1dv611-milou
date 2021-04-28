import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import PageController from '../controllers/pageController';
import PageMiddleware from '../middleware/pageMiddleware';
import AuthMiddleware from '../middleware/authMiddleware';

export default class PageRouter implements IRouter {
    private controller: PageController = new PageController()
    private middleware: PageMiddleware = new PageMiddleware()
    private authMiddleware: AuthMiddleware = new AuthMiddleware()

    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        /**
         * @swagger
         * /pages:
         *   post:
         *     summary: Add a new address.
         *     tags:
         *       - pages
         *     description: This can only be done by a registered user and links it to the user adding it.
         *     operationId: createAddress
         *     parameters:
         *       - name: address
         *         in: body
         *         description: address that needs to be created
         *         required: true
         *     requestBody:
         *       content:
         *         application/json:
         *       description: Create address
         *       required: true
         *     responses:
         *       201:
         *         description: Created address
         *       400:
         *         description: Invalid address supplied
         *       401:
         *         description: Unauthorized.
         */
        this.router.post('/',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.bodyHasAddress(req, next),
            (req, res, next) => this.controller.create(req, res, next)
        );
        
        //Todo fix id and address in this, wont do its thing
        /**
         * @swagger
         * /pages/{id}:
         *   put:
         *     summary: Update an address.
         *     tags:
         *       - pages
         *     description: This can only be done by a registered user and links it to the user adding it.
         *     operationId: updateAddress
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Id of the address that needs to be updated
         *         required: true
         *       - name: address
         *         in: body
         *         description: address that will replace the current address
         *         required: true
         *     requestBody:
         *       content:
         *         application/json:
         *       description: Update address
         *       required: true
         *     responses:
         *       204:
         *         description: Updated address
         *       400:
         *         description: Invalid address supplied
         *       401:
         *         description: Unauthorized.
         */
        this.router.put('/:id',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.paramsHasObjectId(req, next),
            (req, res, next) => this.middleware.bodyHasAddress(req, next),
            (req, res, next) => this.controller.update(req, res, next)
        );
        
        /**
         * @swagger
         * /pages:
         *   get:
         *     summary: Get a specific users pages.
         *     tags:
         *       - pages
         *     description: Get all URLs that are in a users list, if adding query parameter, get domain specific URLs.
         *     operationId: getPages
         *     parameters:
         *       - name: address
         *         in: path
         *         description: full address in which the domain will be selected and found.
         *         required: false
         *     responses:
         *       200:
         *         description: Returns an JSON object of pages.
         *       401:
         *         description: Unauthorized.
         */
        this.router.get('/', 
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.controller.getPages(req, res, next)
        );
              
        /**
         * @swagger
         * /pages/{id}:
         *   delete:
         *     summary: Remove a page.
         *     tags:
         *       - pages
         *     description: Removes a specific page from the user.
         *     operationId: deletePage
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Id of the address that needs to be updated
         *         required: true
         *     responses:
         *       200:
         *         description: Page deleted from user.
         *       400:
         *         description: id is not a valid page.
         *       401:
         *         description: Unauthorized.
         */
        this.router.delete('/:id',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.controller.delete(req, res, next)
        );
    }
}