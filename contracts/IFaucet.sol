// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// will provide an interface for our smartcontract 
// interface contracts all have to be external 

// they cannot inherit from other contracts
// they can only inherit from other interfaces

// they cannot decalre a contrsuctor
// they cannot declare state variables


interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}