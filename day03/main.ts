import fs from "node:fs";

const day = 'day03';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');

    const banks: string[] = file.split(/\r\n/);
    
    let highestJoltage = getHighestJoltage(banks, 2);
    console.log(highestJoltage);
    
    highestJoltage = getHighestJoltage(banks, 12);
    console.log(highestJoltage);

}

function getHighestJoltage(banks: string[], limit: number): number {
    let totBankJoltage = 0;

    banks.forEach(bank => {
        totBankJoltage += getBankJoltage(bank.split(''), limit)
    });
    
    return totBankJoltage
}

function getBankJoltage(batteries: string[], limit: number): number {
    let initPos = 0;
    let keepJoltage = 0;
    let combination = '';

    for (;limit > 0; limit--) {

        for (let i = initPos; i <= batteries.length - limit; i++) {
            
            const curBattery = parseInt(batteries[i]);
    
            if (curBattery > keepJoltage) {
                keepJoltage = curBattery;
                initPos = i + 1;
            }
            
        }

        combination += keepJoltage;
        keepJoltage = 0;
    }

    return parseInt(combination)
}