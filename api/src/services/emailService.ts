import { IScore } from '../models/measurements';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../utils/email';
import UserPage from '../models/userPage';
import User from '../models/user';
import Mail from 'nodemailer/lib/mailer';

export default class EmailService {
    
    public async notifyDecreasedGPSIResults(emails: string[], previousScore: IScore, newScore: IScore, address: string): Promise<void> {
        try {
            if (emails.length >= 1) {
                await this.sendMail(
                    emails,
                    emailTemplate(previousScore, newScore, address), 
                    this.createHotmailMailConfig(process.env.EMAIL_USER || '', process.env.EMAIL_PASSWORD || '')
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async getUserEmails(pageID: string): Promise<string[]> {
        const userIDS = await UserPage.findUserIdsOfPage(pageID);
        
        return await User.findUserEmailsFromIDS(userIDS);
    }

    private async sendMail(emails: string[], message: string, transporter: Mail) {
        await transporter.sendMail({
            from: '"Hermes GPSI Test" <' + process.env.EMAIL_USER + '>',
            to: emails.join(','),
            subject: 'Lowered result',
            text: 'Hermes GPSI measurement.',
            html: message
        });
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
}