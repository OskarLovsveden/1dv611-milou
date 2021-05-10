import { scheduleJob } from 'node-schedule'; 
import GPSIService from '../services/gpsiService';
export const startCronJob = () => {
    const rules = [
        '1 23 * * *',
        '1 23 * * 7',
        '1 23 28 * *'
    ];

    addJob(rules);
};

const addJob = (rules: string[]) => {
    const gpsiService = new GPSIService();
    const jobs: any[] = [];
    rules.forEach((rule: string) => {
        jobs.push(scheduleJob(rule, gpsiService.performScheduledMeasures));
    });

    jobs.forEach((job:any) => {
        console.log(job);
    });
};

const test = () => {
    console.log('Klockan är 10');
};
