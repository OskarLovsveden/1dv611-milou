import { ICategory, IScore } from '../models/measurements';
import moment from 'moment';

export const createGPSIGraphHTML = (pageScores: IScore[], address: string): string => {
    const graphTitle = 'GPSI Measurements For: ' + address;
    const organizedMeasurements = getOrganizedMeasurements(pageScores);
    const categories = getCategories(organizedMeasurements);
    const dates = getDates(pageScores);
    const scores = getScores(categories, organizedMeasurements, pageScores);
    const datasets = createDataSets(categories, scores);
    
    const graphObject = createGraphObject(dates, datasets, graphTitle); 


    return '<script src=\'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js\'></script>'+
    '<div id="canvasWrapper">' +
    '<canvas id=bar-chart></canvas>'+
    '</div>' +
    '<style> body { overflow: hidden; }' + 
    '#canvasWrapper { width: 80%; margin: auto; }' +
    '</style>' +
    '<script>'+
    'var logChart = new Chart(document.getElementById(\'bar-chart\'),' + JSON.stringify(graphObject) +');'+
    '</script>';
};

const createGraphObject = (dates: string[], datasets: any, graphTitle: string) => {
    return {
        type: 'line',
        data: {
            labels: dates,
            datasets
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.1
                }
            },
            title: {
                display: true,
                text: graphTitle,
                color: 'rgb(252 31 78)',
                fontSize: 30
            }
        }
    };
};

const createDataSets = (categories: string[], scores: any) => {
    const colors = ['rgb(31, 233, 182)', 'rgb(125, 79, 255)', 'rgb(255, 178, 2)', 'rgb(3, 175, 254)', 'rgb(255, 65, 129)', 'rgb(161, 161, 161)', 'rgb(183, 24, 255)'];
    return categories.map((c: any, index: number) => {
        return {
            label: c,
            data: scores[index],
            fill: false,
            borderColor: colors[index]
        };
    });
};

const getOrganizedMeasurements = (pageScores: IScore[]): ICategory[] => {
    return pageScores.map((ps: IScore) => ps.categories)
        .reduce((acc, val) => acc.concat(val), []);
};

const getDates = (pageScores: IScore[]): string[] => {
    return pageScores.map((ps: any) => moment(ps.createdAt).format('MMMM Do YYYY, HH:mm'));
};

const getCategories = (organizedMeasurements: ICategory[]): string[] => {
    const categories = [...new Set(organizedMeasurements.map((oM: ICategory) => oM.title))];
    categories.unshift('Total Scores');

    return categories;
};

const getScores = (categories: string[], measurements: ICategory[], pageScores: IScore[]) => {
    const totalScores = pageScores.map((ps: IScore) => ps.totalScore);

    const categoriyScores = categories.map((d:any) => {
        return measurements.filter((a: any) => a.title === d).map((c: any) => c.score);
    });
    categoriyScores.unshift(totalScores);

    return categoriyScores;
};
