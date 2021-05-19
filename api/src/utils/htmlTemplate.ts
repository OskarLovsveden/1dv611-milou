import { IScore } from '../models/measurements';
import moment from 'moment';


export const graphTemplate = (pageScore: IScore[], address: string): string => {
    const colors = ['rgb(31, 233, 182)', 'rgb(125, 79, 255)', 'rgb(255, 178, 2)', 'rgb(3, 175, 254)', 'rgb(255, 65, 129)', 'rgb(161, 161, 161)', 'rgb(183, 24, 255)'];
    const organizedMeasurements = getOrganizedMeasurements(pageScore);
    const categories = getCategories(organizedMeasurements);
    categories.unshift('Total Scores');
    const dates = pageScore.map((pd: any) => moment(pd.createdAt).format('MMMM Do YYYY, HH:mm'));
    const totalScores = pageScore.map((ps: IScore) => ps.totalScore);

    const categoriyScores = categories.map((d:any) => {
        return organizedMeasurements.filter((a: any) => a.title === d).map((c: any) => c.score);
    });
    categoriyScores.unshift(totalScores);
    
    const dattaSets = categories.map((c: any, index: number) => {
        return {
            label: c,
            data: categoriyScores[index],
            fill: false,
            borderColor: colors[index]
        };
    });

    const data = {
        type: 'line',
        data: {
            labels: dates,
            datasets: dattaSets
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
                text: 'GSPI Measurements For ' + address,
                color: 'rgb(252 31 78)',
                fontSize: 30
            }
        }
    };

    return '<script src=\'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js\'></script>'+
    '<canvas id=\'bar-chart\' width=\'800\' height=\'450\'></canvas>'+
    '<script>'+
    'var logChart = new Chart(document.getElementById(\'bar-chart\'),' + JSON.stringify(data) +');'+
    '</script>';
};

const getOrganizedMeasurements = (pageScore: IScore[]) => {
    return pageScore.map((ps:any) => ps.categories)
        .reduce((acc, val) => acc.concat(val), []);
};

const getCategories = (organizedMeasurements: any[]) => {
    return [...new Set(organizedMeasurements.map((te:any) => te.title))];
};

/* const flattenArray = (arr: any[]) => {

}; */