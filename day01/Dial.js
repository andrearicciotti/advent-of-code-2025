export class Dial {
    constructor(initNum, finalNum, startNum) {
        this.initNum = initNum;
        this.finalNum = finalNum;
        this.currentNum = startNum;
        this.dialNumbers = [];
    }

    setDialNumbers() {
        const totNumbers = this.finalNum - this.initNum;
        this.dialNumbers = [];

        for (let i = 0; i <= totNumbers; i++) {
            this.dialNumbers.push(i);
        }
    }
}

export default Dial;