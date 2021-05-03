import { URL } from 'url';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';

export const validateUrlResponse = async (url: URL): Promise<void> => {
    try {
        const response = await fetch(url);
        if(response.status >= 400 && response.status < 600) {
            throw createHttpError(400);
        }
        return;
    } catch (error) {
        throw createHttpError(400, { 
            message: {
                detail: `${url} is not valid.`, 
                address: url
            }
        });
    }
};
