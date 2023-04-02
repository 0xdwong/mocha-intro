const { expect } = require("chai");
const MyMath = require("../math");


describe("math", () => {
    before(() => {
        console.log('====before====，在所有测试用例开始前');
    });

    after(() => {
        console.log('====after====，在所有测试用例结束后');
    });

    beforeEach(() => {
        console.log('====beforeEach====，在每个测试用例开始前');
    });

    afterEach(() => {
        console.log('====afterEach====，在每个测试用例开始前');
    });

    it("1 plus 1 should return 2", () => {
        const myMath = new MyMath();
        const result = myMath.plus(1, 1);
        expect(result).to.equal(2);
    })

    it("1 minus 1 should return 0", () => {
        const myMath = new MyMath();
        const result = myMath.minus(1, 1);
        expect(result).to.equal(0);
    })

})