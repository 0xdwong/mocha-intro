//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MyError {
    error DivZero();
    error DivZero2(string);

    MyMath myMath;

    uint public pos = 0;

    constructor(address mathAddr) {
        myMath = MyMath(mathAddr);
    }

    function revertWithoutMsg(uint x, uint y) public pure returns (uint) {
        if (y == 0) revert DivZero();
        return x / y;
    }

    function revertWithMsg(uint x, uint y) public pure returns (uint) {
        // if (y == 0) revert DivZero2("with msg"); 
        require(y != 0, "divzero" );

        return x / y;
    }

    function testError() public returns (uint) {
        try myMath.div(1,0) returns (uint) {
            pos = 1;
        } catch Error(string memory /*reason*/) {
            pos = 2;
        } catch Panic(uint /*errorCode*/) {
            pos = 3;
        } catch (bytes memory /*lowLevelData*/) {
            pos = 4;
        }
        return pos;
    }
}

contract MyMath{
    error DivZero();

    constructor(){

    }

    function div(uint x, uint y) public pure returns (uint){
        if (y == 0) revert DivZero();
        return x / y;
    }
}
