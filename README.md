## An application to transfer energy units to the consumer based on the prosumer concept on restructured electricity area. Transactions are done using cryptocurrency.


![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

1 Energy Unit = 1 SharUToken


## Prerequisites to get Started :-

- Install Ganache 
- Install Chrome extension of Metamask
- Install truffle
- Install npm and NodeJS


## Installation

This app requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
truffle init

npm run dev

truffle migrate --reset

truffle console

SharUTokenSale.deployed().then(function(i){tokenSale=i})

SharUToken.deployed().then(function(i){token=i})

tokensAvailable=9000000

web3.eth.getAccounts().then(function(i){accounts=i})

accounts[0]

admin = accounts[0]

token.transfer(tokenSale.address, tokensAvailable, {from:admin})

token.balanceOf(tokenSale.address)
```
