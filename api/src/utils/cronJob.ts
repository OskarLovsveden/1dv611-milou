import { scheduleJob } from 'node-schedule'; 
import GPSIService from '../services/gpsiService';
export const startCronJob = () => {
    const gpsiService = new GPSIService();
    scheduleJob('44 14 * * *', () => gpsiService.performScheduledMeasures());
};
