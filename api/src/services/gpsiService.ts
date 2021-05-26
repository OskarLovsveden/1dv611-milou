import Measurement, { IScore } from '../models/measurements';
import Page from '../models/page';
import UserPage, { IUserPage } from '../models/userPage';
import fetch from 'node-fetch';
import { URL } from 'url';
import EmailService from './emailService';
import { isLastDayOfTheWeek, isLastDayOfTheMonth } from '../utils/cronJob';

export default class GPSIService {
    private emailService: EmailService = new EmailService()
    private numberOfTestRuns = 2
    
    public async measurePages(address: string) : Promise<IScore> {
        try {
            const measurement: IScore = await this.getGPSIResults(address);
            const page = await Page.findOrCreate(new URL(address));

            return await Measurement.addScore(measurement, page.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async performScheduledMeasures() : Promise<void> {
        try {
            const uniquePageIDS = await this.getPageIDS();
            const pages = await Page.getAllPagesByIDS(uniquePageIDS);

            for (const page of pages) {
                const previousResult = await Measurement.getLatestMeasurement(page.id);
                const newResult = await this.measurePages(page.address);
                if (this.shouldNotifyUser(previousResult.totalScore, newResult.totalScore)) {
                    this.emailService.notifyDecreasedGPSIResults(page.id, previousResult, newResult, page.address);
                }
            }
          
        } catch (error) {
            console.log(error);
        }
    }

    private async getGPSIResults(address: string): Promise<IScore> {
        const gpsiResults: IScore[] = [];
        for (let index = 0; index < this.numberOfTestRuns; index++) {
            const gpsiData = await this.gpsiAPIRequest(address);
            gpsiResults.push(this.gpsiDataFormatter(gpsiData));
        }
        return this.compareGPSIResults(gpsiResults);
    }

    private compareGPSIResults(scores: IScore[]): IScore {
        return scores.reduce((scoreOne: IScore, scoreTwo: IScore) => scoreOne.totalScore > scoreTwo.totalScore ? scoreOne : scoreTwo);    
    }

    private shouldNotifyUser(previousScore: number, newScore: number): boolean {
        return previousScore > newScore || previousScore === 0;
    }

    private async getPageIDS(): Promise<string[]> {
        const pagesToMeasure: IUserPage[] = [];
        pagesToMeasure.push(...await UserPage.find({ measureAt: 'Daily' }));

        if (isLastDayOfTheWeek()) {
            pagesToMeasure.push(...await UserPage.find({ measureAt: 'Weekly' }));
        } 
        if (isLastDayOfTheMonth()) {
            pagesToMeasure.push(...await UserPage.find({ measureAt: 'Monthly' }));
        }

        return [...new Set(pagesToMeasure.map((page: IUserPage) => page.addressID))];
    }

    private async gpsiAPIRequest(address: string): Promise<any> {
        const encodedAddress = encodeURI(address);
        const url = `${process.env.GPSI_URL}?url=${encodedAddress}&key=${process.env.GPSI_TOKEN}&category=PERFORMANCE`;

        const response = await fetch(url);
        return await response.json();
    }

    private gpsiDataFormatter(unformattedData: any): IScore {
        const categories = unformattedData.lighthouseResult.categories.performance.auditRefs
            .filter((metric: any) => metric.group === 'metrics')
            .map((category: any) => category.id)
            .map((result: any) => unformattedData.lighthouseResult.audits[result]);
        return {
            totalScore: unformattedData.lighthouseResult.categories.performance.score,
            categories
        };
    }
}


