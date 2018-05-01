var investor = {
    "initial": {
        "net": 100000,
        "crypt": 10000,
    },
    "rules": {
        "gainTolerance": 12,
        "lossTolerance": 6,
        "maxInvestment": 20000,
        "useProfit": true,
        "avgFees": 2,
        "portfolioCryptPc": 10,
    },
    "results": [],
}

// console.log("results", investor.results);
// console.log("results0", investor.results[0]);

function calcPeriod(investor, change) {
    console.log("investor", investor);
    
    var net = crypt = cryptPl = netPl = fee = netFees = cashMade = 0;
    
    if(investor.results.length == 0) {
        fee = investor.initial.crypt * (investor.rules.avgFees / 100);
        crypt = investor.initial.crypt - fee;
        net = investor.initial.net - fee;
    } else {
        netFees = investor.results[investor.results.length - 1].netFees;
        cashMade = investor.results[investor.results.length - 1].cashMade;
        cryptPl = investor.results[investor.results.length - 1].cryptPl;
        netPl = investor.results[investor.results.length - 1].netPl;
        crypt = investor.results[investor.results.length - 1].crypt;
        net = investor.results[investor.results.length - 1].net;
    }

    let cryptChange = crypt * (change / 100);
    crypt = crypt + cryptChange;
    net = net + cryptChange;
    // console.log("net", net);
    // console.log("crypt", crypt);
    // console.log("fee", fee);
    // console.log("avgfee", investor.rules.avgFees);
    
    let portfolioCryptPc = (crypt / net) * 100;

    // console.log("crypt Percent", portfolioCryptPc);

    let portfolioChange = portfolioCryptPc - investor.rules.portfolioCryptPc;
                    
    // console.log("Portfolio Change", portfolioChange);

    if( portfolioCryptPc > investor.rules.gainTolerance || portfolioCryptPc < investor.rules.lossTolerance ) {
        let withdraw = crypt - (net * (investor.rules.portfolioCryptPc / 100));
        console.log("withdraw", withdraw)
        crypt = crypt - withdraw;
        let withdrawalFee = withdraw * (investor.rules.avgFees / 100);
        console.log("withdrawalFee", withdrawalFee)
        
        cashMade += withdraw - withdrawalFee;
        net = net - withdrawalFee;
        fee += withdrawalFee;

        // Deal with Losses!
        work out how much to invest
        take from remaining investable money
        calulate fees,
        remove fee from crypto purchase
        add fee to total fee
        calc net portfolio and percentages
    }
    netFees += fee;

    cryptPl = crypt - investor.initial.crypt;
    netPl = net - investor.initial.net;
    cryptPlPc = (crypt / investor.initial.crypt) * 100;
    netPlPc = (net / investor.initial.net) * 100;


    let result =  { net, crypt, cryptPl, netPl, fee, netFees, cashMade }

    investor.results.push(result)

    return investor
}


