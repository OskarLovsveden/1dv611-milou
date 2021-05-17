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
         *     parameters:
         *       - name: address
         *         in: body
         *         description: Valid address that needs to be created.
         *         required: true
         *       - name: timeInterval
         *         in: body
         *         description: Time interval for the page being created, "Daily", "Weekly", or "Monthly".
         *         required: true
         *       - name: bearer-token
         *         in: header
         *         description: Bearer token that the user supplies.
         *         required: true
         *     responses:
         *       201:
         *         description: Created address.
         *       400:
         *         description: Invalid address supplied.
         *       401:
         *         description: Unauthorized.
         */
        this.router.post('/',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.bodyHasAddress(req, next),
            (req, res, next) => this.middleware.bodyHasTestInterval(req, next),
            (req, res, next) => this.controller.create(req, res, next)
        );
        
        /**
         * @swagger
         * /pages/{id}:
         *   put:
         *     summary: Update an address.
         *     tags:
         *       - pages
         *     description: This can only be done by a registered user and links it to the user adding it.
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Id of the address that needs to be updated.
         *         required: true
         *       - name: address
         *         in: body
         *         description: Valid address that will replace the current address.
         *         required: true
         *       - name: timeInterval
         *         in: body
         *         description: Time interval for the page being created, "Daily", "Weekly", or "Monthly".
         *         required: true
         *       - name: bearer-token
         *         in: header
         *         description: Bearer token that the user supplies.
         *         required: true
         *     responses:
         *       204:
         *         description: Updated selected address.
         *       400:
         *         description: Invalid address supplied.
         *       401:
         *         description: Unauthorized.
         */
        this.router.put('/:id',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.paramsHasObjectId(req, next),
            (req, res, next) => this.middleware.bodyHasAddress(req, next),
            (req, res, next) => this.middleware.bodyHasTestInterval(req, next),
            (req, res, next) => this.controller.update(req, res, next)
        );
        
        /**
         * @swagger
         * /pages?domain={address}:
         *   get:
         *     summary: Get a specific user's pages.
         *     tags:
         *       - pages
         *     description: Get the URLs that are in a the user's list, with query parameter - get domain specific URLs, remove query parameter for all of the user's URLs.
         *     parameters:
         *       - name: address
         *         in: path
         *         description: Full address in which the domain will be selected and found.
         *         required: false
         *       - name: bearer-token
         *         in: header
         *         description: Bearer token that the user supplies.
         *         required: true
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
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Id of the address that needs to be deleted.
         *         required: true
         *       - name: bearer-token
         *         in: header
         *         description: Bearer token that the user supplies.
         *         required: true
         *     responses:
         *       200:
         *         description: Page deleted from user. 
         *       400:
         *         description: Id is not a valid page.
         *       401:
         *         description: Unauthorized.
         */
        this.router.delete('/:id',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.controller.delete(req, res, next)
        );
    }
}