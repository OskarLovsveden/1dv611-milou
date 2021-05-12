import { Request } from 'express';
import { IScore } from '../models/measurements';
import fetch from 'node-fetch';
import UserPage from '../models/userPage';
import User from '../models/user';

export default class EmailService {
    
    public async notifyDecreasedGPSIResults(pageID: string): Promise<void> {
        try {
            const userIDS = await UserPage.findUserIdsOfPage(pageID);
            const userEmails = await User.findUserEmailsFromIDS(userIDS);

            console.log('==========SENDING MAIL TO USERS:===============');
            console.log(userEmails);

            /** 
             * NOT DONE
            */
        } catch (error) {
            
        }
    }
}