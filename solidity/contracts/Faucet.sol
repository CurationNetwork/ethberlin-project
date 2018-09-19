pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/ownership/Superuser.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract Faucet is Superuser {

    using SafeMath for uint;

    event FaucetSended(
        address receiver,
        uint amount
    );
    event AdminAdded(
        address admin
    );
    event AdminRemoved(
        address admin
    );

    StandardToken token;
    mapping (address => uint) lastFaucets;

    uint public faucetSize;
    uint public faucetRate;

    constructor(address tokenAddress, address[] admins) public {
        token = StandardToken(tokenAddress);

        for (uint i = 0; i < admins.length; i++) {
            addRole(admins[i], ROLE_SUPERUSER);
        }
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


    function addAdmin(address newAdmin)
        public
        onlyOwner
    {
        require(newAdmin != address(0));
        addRole(newAdmin, ROLE_SUPERUSER);
        emit AdminAdded(newAdmin);
    }

    function removeAdmin(address admin)
        public
        onlyOwner
    {
        require(admin != address(0));
        removeRole(admin, ROLE_SUPERUSER);
        emit AdminRemoved(admin);
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
