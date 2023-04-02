async function sleep(second) {
    await new Promise(resolve => setTimeout(resolve, second * 1000));
}


class MyMath {
    constructor() { }

    plus(x, y) {
        return x + y;
    }

    minus(x, y) {
        return x - y;
    }

    divide(x, y) {
        if (y === 0) throw new Error('Dividend cannot be 0');
        return x / y;
    }

    async somethingTakesLongTime() {
        await sleep(1);
        console.log('============');
        return true;
    }
}

module.exports = MyMath;