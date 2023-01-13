import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";

var anchorSession = null
var link = null;

 async function anchorLogin(apiNode) {
    anchorSession = null;
    try {
        await anchorCreateApiNode(apiNode)
        const identity = await link.login('nambuangongo');
// Save the session within your application for future use
        const session = identity.session;
        anchorSession = session;
        return anchorSession;
    } catch (e) {
        console.log("Login failed");
        console.log(e);
        return anchorSession;
    }
};

 async function anchorCreateApiNode(apiNode) {
    const transport = new AnchorLinkBrowserTransport();
    link = new AnchorLink({
        transport,
        chains: [
            {
                // //MAIN
                //chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
                //nodeUrl: apiNode

                //TEST
                 chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
                 nodeUrl: 'https://wax-testnet.eosphere.io'
            }
        ],
    })
}

 async function anchorGetBalance(userAccount) {
    const {client} = anchorSession.link;

    const balance = await client.v1.chain.get_currency_balance('eosio.token', userAccount, 'WAX');
    if (balance.length > 0) {
        const balanceUnits = parseFloat(balance[0].toString().split(' '));
        return balanceUnits.toFixed(2);
    } else return "0";
};

 async function anchorStakeNft(userAccount, assetId) {
    var assetIds = [];
    assetIds.push(parseInt(assetId))
    const action = {
        account: 'atomicassets',
        name: 'transfer',
        data: {
            from: userAccount,
            to: 'nambuangongo',
            asset_ids: assetIds,
            memo: 'stake'
        },
        authorization: [
            {
                actor: userAccount,
                permission: "active"
            }
        ]
    }

    try {
        await anchorSession.transact({actions: [action]}).then(({transaction}) => {
            console.log(`Transaction broadcast! Id: ${transaction.id}`)
        })
    } catch (e) {
        console.log("Staking Failed");
        console.log(e);
        return null;
    }
    return true;
};

 async function anchorUnstakeNft(userAccount, assetId) {
    var assetIds = [];
    assetIds.push(parseInt(assetId))
    const action = {
        account: "nambuangongo",
        name: "unstake",
        data: {
            to: userAccount,
            asset_ids: assetIds
        },
        authorization: [
            {
                actor: userAccount,
                permission: "active"
            }
        ]
    }


    try {
        await anchorSession.transact({actions: [action]}).then(({transaction}) => {
            console.log(`Transaction broadcast! Id: ${transaction.id}`)
        })
    } catch (e) {
        console.log(e);
        console.log("Unstaking Failed");
        return null;
    }
    return true;
};

 async function anchorLogout(userAccount) {
    //console.log(link);
    //console.log(anchorSession);
    link.removeSession('nambuangongo', anchorSession.auth, anchorSession.chainId)
};