App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 9000000,
    //token price is in wei

    init: function () {
        console.log("App initialized...")
        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
            web3 = new Web3(App.web3Provider);
        }

        return App.initContracts();

    },

    initContracts: function () {
        $.getJSON("SharUTokenSale.json", function (sharUTokenSale) {
            App.contracts.SharUTokenSale = TruffleContract(sharUTokenSale);
            App.contracts.SharUTokenSale.setProvider(App.web3Provider);
            App.contracts.SharUTokenSale.deployed().then(function (sharUTokenSale) {
                console.log("SharU Token Sale Address: ", sharUTokenSale.address);
            });
        }).done(function () {
            $.getJSON("SharUToken.json", function (sharUToken) {
                App.contracts.SharUToken = TruffleContract(sharUToken);
                App.contracts.SharUToken.setProvider(App.web3Provider);
                App.contracts.SharUToken.deployed().then(function (sharUToken) {
                    console.log("SharU Token Address: ", sharUToken.address);

                });
                return App.render();
            });

        });
    },

    //listening for events emitted from contracts

    listenForEvents: function () {

        App.contracts.SharUTokenSale.deployed().then(function (instance) {
            instance.Sell({
                fromBlock: 0,
                toBlock: 'latest',
            }).watch(function (error, event) {
                console.log("Event Triggered", event);
                App.render();
            })
        })

    },

    render: function () {

        // if (App.loading) {
        //     return;
        // }
        // App.loading = true;
        // var loader = $('#loader');
        // var content = $('#content');

        // loader.show();
        // content.hide();

        //load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err == null) {
                console.log("account", account);
                App.account = account;
                $('#accountAddress').html("Your Account: " + account);

            }
        })

        App.contracts.SharUTokenSale.deployed().then(function (instance) {
            sharUTokenSaleInstance = instance;
            return sharUTokenSaleInstance.tokenPrice();
        }).then(function (tokenPrice) {
            console.log("tokenPrice: ", tokenPrice)
            App.tokenPrice = tokenPrice;
            $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
            return sharUTokenSaleInstance.tokenSold();
        }).then(function (tokensSold) {
            App.tokenSold = tokensSold.toNumber();
            $('.tokens-sold').html(App.tokensSold);
            $('.tokens-available').html(App.tokensAvailable);

            var progressPercent = (App.tokensSold / App.tokensAvailable) * 100;
            $('#progress').css('width', progressPercent + '%');

            //Load token Contract

            App.contracts.SharUToken.deployed().then(function (instance) {
                sharUTokenInstance = instance;
                return sharUTokenInstance.balanceOf(App.account);
            }).then(function (balance) {
                $('.sharu-balance').html(balance.toNumber());
                //wait for Sell event


            })
        });
    },

    buyTokens: function () {
        // $('#content').hide();
        // $('#loader').show();
        var numberOfToken = $('#numberOfToken').val();
        App.contracts.SharUTokenSale.deployed().then(function (instance) {
            return instance.buyTokens(numberOfToken, {
                from: App.account,
                value: numberOfToken * App.tokenPrice,
                gas: 500000
            });
        }).then(function (result) {
            console.log("Tokens Bought...")
            $('form').trigger('reset') //Reset Number of tokesn in form
            // $('#content').show();
            // $('#loader').hide();


        })
    }

}

$(function () {
    $(window).load(function () {
        App.init();
    })
});