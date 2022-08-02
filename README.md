An application to transfer energy units to the consumer based on the prosumer concept on restructured electricity area.

Use following commands:

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


