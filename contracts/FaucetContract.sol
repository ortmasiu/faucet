// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

// will inherit everything from the owned smart contract 
contract Faucet is Owned, Logger, IFaucet {

    uint public numberOfFunders;

    mapping(address => bool) private funders; // if uint = 0 returns funders[0]
    mapping(uint => address) private lutFunders; // lut means look up table
    
    modifier limitWithdraw(uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000, 
            "Cannot withdraw more than 0.1 ether Ted!"
            );
            _;
    }
    
    receive() external payable {}

    function emitLog() public override pure returns(bytes32) {
        return "Hello World!";
    }


    function addFunds() override external payable {
        address funder = msg.sender;
        test3();
        
        // since the mapping uses addresses as a key in the funders dynamic array, check if there is an address in funders and return true if there is, else increment funders and add them to the mapping. this is to prevent a duplication of funders in the mapping
        
        if (!funders[funder]) {
            uint index = numberOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        } 
    }

    function test1() external onlyOwner {
        // some function that only the admin can have access to 
    }

    function test2() external onlyOwner {
        // some function that only the admin can have access to 
    }


    function withdraw(uint withdrawAmount) override external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount); 
    } 
    
    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numberOfFunders);
        
        for (uint i = 0; i < numberOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders; 
    } 

    function getFunderAtIndex(uint8 index) external view returns(address) {
        return lutFunders[index];
    } 







    // special function called receive
    // called when a transaction (tx) is made that doesnt specify
    // the function name to call 

    // External functions are part of the contract interface
    // which means they can be called via other contracts and other transactions (txs)
    
    // public modifier should be used for functions that will be called from inside the smart contract
    // external modifier should be used to call function from outside the smart contract
    
    // pure, view modifiers (read-only call with no gas fees)
    // view - indicates that the function will not alter the state of the blockchain
    // pure - even more strict, indicating the it wont even read the storage state 
    
    // to talk to a node inthe network you can make use of JSON RPC API
   
    
}