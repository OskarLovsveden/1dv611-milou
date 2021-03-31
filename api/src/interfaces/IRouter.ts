import { Router } from 'express';
export interface IRouter {
    expressRouter: Router
    initializeRoutes: () => void
}