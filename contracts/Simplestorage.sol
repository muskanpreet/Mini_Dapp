// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;
contract Simplestorage{
    uint a;
    function setter(uint _a)public{
        a=_a;
    }
    function getter()public view returns(uint)
    {
        return a;
    }
}