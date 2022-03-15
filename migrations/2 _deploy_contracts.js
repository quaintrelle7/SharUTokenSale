var SharUToken = artifacts.require("./SharUToken.sol");
var SharUTokenSale = artifacts.require("./SharUTokenSale.sol");
//creating artifacts ==> creating a contract abstraction that truffle can use to run in JVEnv
//Or running clinetside applications

module.exports = function (deployer) {
    deployer.deploy(SharUToken, 9000000).then(function () {
        var tokenPrice = 1000000000000000;
        return deployer.deploy(SharUTokenSale, SharUToken.address, tokenPrice);
    });

};
