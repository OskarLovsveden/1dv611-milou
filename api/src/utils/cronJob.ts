import { scheduleJob } from 'node-schedule'; 
import GPSIService from '../services/gpsiService';
export const startCronJob = () => {
    const gpsiService = new GPSIService();
    scheduleJob('1 23 * * *', () => gpsiService.performScheduledMeasures());
};

export const isLastDayOfTheWeek = (): boolean => {
    const date = new Date();
    return date.getDay() === 0;
};

export const isLastDayOfTheMonth = (): boolean => {
    const date = new Date();
    return date.getDay() === 28;
};