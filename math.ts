import { expect } from 'chai';
import plus from './math2';

describe.skip('math', function () {
    it('1 加 1 应该等于 2', function () {
        expect(plus(1, 1)).to.be.equal(2);
    });
});
