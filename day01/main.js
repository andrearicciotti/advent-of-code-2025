import fs from "node:fs";
import { Dial } from "./Dial.js";

const day = 'day01';
const filePath = './' + day + '.txt';

main();

function main() {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return
        }

        const rules = formatInput(data);

        const dial = new Dial(0, 99, 50);

        dial.setDialNumbers();
        dial.setRotations(rules);
    });
}

function formatInput(data) {
    const formatData = [];
    console.log(data, data[11]);

    return formatData
}