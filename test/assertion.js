const { expect } = require("chai");

describe("assertion", () => {
    it("expect", () => {
        const foo = 'bar';

        expect(foo).to.be.a('string');
        expect(foo).to.equal('bar');
        expect(foo).to.have.lengthOf(3);

        const arr = [1, 2, 3];
        expect(arr).to.be.an('array');
        expect(arr).to.have.lengthOf(3);
        expect(arr).to.be.an('array').that.have.lengthOf(3);


        expect({ a: 1 }).to.eql({ a: 1 }).but.not.equal({ a: 1 });
        expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
    })
})