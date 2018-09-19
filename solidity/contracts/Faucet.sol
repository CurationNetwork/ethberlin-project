pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Superuser.sol';

contract Faucet is Superuser {

    using SafeMath for uint;

    event FaucetSended(
        address receiver,
        uint amount
    );

    StandardToken token;
    mapping (address => uint) lastFaucets;

    uint public faucetSize;
    uint public faucetRate;


    constructor() public {}

    function init(address tokenAddress)
        public
        onlyOwner
    {
        token = StandardToken(tokenAddress);
    }


    function getBalance()
        view
        public
        returns (uint)
    {
        return token.balanceOf(this);
    }

    function getLastFaucet(address target)
        view
        public
        returns (uint)
    {
        return lastFaucets[target];
    }


    function setFaucetRate(uint newRate)
        public
        onlyOwner
    {
        faucetRate = newRate;
    }

    function setFaucetSize(uint newSize)
        public
        onlyOwner
    {
        faucetSize = newSize;
    }

    function faucet()
        public
    {
        if (!isSuperuser(msg.sender)) {
            require(lastFaucets[msg.sender].add(faucetRate) < now, "faucet rate limit");
        }

        require(faucetSize <= getBalance(), "faucet balance not enough");

        lastFaucets[msg.sender] = now;
        require(token.transfer(msg.sender, faucetSize));
        emit FaucetSended(msg.sender, faucetSize);
    }
}
