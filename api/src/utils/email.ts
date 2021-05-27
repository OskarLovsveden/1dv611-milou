import { IScore } from '../models/measurements';

export const emailTemplate = (previousScore: IScore, newScore: IScore, address: string): string => {
    return `
    <h1>GPSI Measurement Score Change for ${address}.</h1>
    <h2>Previous Total Score: ${previousScore.totalScore}</h2>
    <h2>New Total Score: ${newScore.totalScore}</h2>
    <hr>
    <h3>Previous Score Details</h3>
    ${createMeasurementString(previousScore)}
    <hr>
    <h3>New Score Details</h3>
    ${createMeasurementString(newScore)}
    <hr>
    <h3>Contact for more information:</h3>
    <p><a href="mailto:todoaddrealemailhere@example.com">Email Us</a></p>
    <p><a href="localhost">Visit our page for more info</a></p>
    `;
};

const createMeasurementString = (score: IScore) => {
    let measurementString = '';
    
    score.categories.forEach((category: any) => {
        measurementString += `
        <h4>Category: ${category.title}</h4>
        <p>Score: ${category.score}</p>
        `;
    });
    
    return measurementString;
};

