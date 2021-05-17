import { Request } from 'express';
import { IScore } from '../models/measurements';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../utils/email';
import UserPage from '../models/userPage';
import User from '../models/user';
import Mail from 'nodemailer/lib/mailer';

export default class EmailService {
    
    public async notifyDecreasedGPSIResults(pageID: string, previousScore: IScore, newScore: IScore, address: string): Promise<void> {
        try {
            await this.sendMail(
                ['odman94@hotmail.com', 'blueberryfire7@hotmail.com'], 
                emailTemplate(previousScore, newScore, address), 
                this.createHotmailMailConfig(process.env.EMAIL_USER || '', process.env.EMAIL_PASSWORD || '')
            );
            /* await this.sendMail(
                await this.getUserEmails(pageID), 
                emailTemplate(previousScore, newScore, address), 
                this.createHotmailMailConfig(process.env.EMAIL_USER || '', process.env.EMAIL_PASSWORD || '')
            ); */
        } catch (error) {
            console.log(error);
        }
    }

    private async sendMail(emails: string[], message: string, transporter: Mail) {
        const info = await transporter.sendMail({
            from: '"Hermes GPSI Test" <milouhermes1@hotmail.com>',
            to: emails.join(','),
            subject: 'Lowered result',
            text: 'Hermes GPSI measurement.',
            html: message
        });
        console.log('Message sent: %s', info.messageId);
    }

    private createHotmailMailConfig(username: string, password: string) : Mail {
        return nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: username,
                pass: password
            }
        });
    }

    private async getUserEmails(pageID: string): Promise<string[]> {
        const userIDS = await UserPage.findUserIdsOfPage(pageID);
        return await User.findUserEmailsFromIDS(userIDS);
    }
}