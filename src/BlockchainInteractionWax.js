import { Wax } from "../node_modules/@waxio/waxjs/dist"
import axios from "axios";
import base64js from "base64-js";
import { JsonRpc, Api } from 'eosjs';
import { UALProvider, withUAL } from "ual-reactjs-renderer";

import counterSlice, { increment } from "counterSlice";
import GRank from "pages/GRank";

const chainId = process.env.REACT_APP_CHAIN_ID;
const rpcEndpoint = process.env.REACT_APP_RPC_ENDPOINT;

export function refreshAll(dispatch) {
  dispatch(increment());
}

export async function buyBooster(ual, template_id)
{
  try {
    const action = {
      account: 'nambuangongo',
      name: 'buyboost',
      data: {
        user: ual.activeUser.accountName,
        template_id: template_id,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };    

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Buy Booster failed:', e.message);
    throw e;
  }
}

export async function buyPacks(ual, template_id)
{
  try {
    const action = {
      account: 'nambuangongo',
      name: 'buypack',
      data: {
        user: ual.activeUser.accountName,
        template_id: template_id,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };    

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Buy Pack failed:', e.message);
    throw e;
  }
}

export async function getNFTsInWallet(walletAddress) {
  const parsedItems = [];
  try {

    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets?owner=${walletAddress}&collection_name=thehustlewax&page=1&limit=1000`;
    const response = await axios.get(url);
    const nfts = response.data.data;


    // loop through the original items array
    for (const item of nfts) {
      // create a new object with just the image and name fields

      if (item.data.img == undefined) {
        continue;
      }

      const parsedItem = {
        asset_id: item.asset_id,
        image: item.data.img,
        name: item.data.name,
        description: item.data.description,
        schema: item.schema.schema_name,
      };
      // add the new object to the parsedItems array
      parsedItems.push(parsedItem);
    }
  } catch (err) {
    console.error("Failed to get NFTs in wallet", err);
  }
  return parsedItems;
}

export async function getBoosterNFTs(ual) {
  try {

    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=thehustlewax&schema_name=boosts&page=1&limit=100&order=desc&sort=created`;

    const response = await axios.get(url);
    const nfts = response.data.data;
    const allowedTemplateIds = ["605907", "605908", "605909", "605916", "605917"]; //TO DO for mainnet
    const filteredNfts = nfts.filter(nft => allowedTemplateIds.includes(nft.template_id));

    const request = {
      json: true,
      code: 'nambuangongo',
      scope: 'nambuangongo',
      table: 'bstavailable',
      limit: 999999, // Set a high limit to fetch all the results
    };
  
    const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);

    const mappedNfts = filteredNfts.map(nft => {
      return {
        template_id: nft.template_id,
        image: nft.immutable_data.img,
        name: nft.immutable_data.name,
        description: nft.immutable_data.description,
      };
    });

    const mergedData = mappedNfts.map(item => {
      const matchingItem = ownedNfts.rows.find(obj => obj.template_id.toString() === item.template_id);
      if (matchingItem) {
        return {
          ...item,
          remaining: matchingItem.remaining,
          boost_price: matchingItem.boost_price
        };
      }
      return item;
    });   

    const request1 = {
      json: true,
      code: 'nambuangongo',
      scope: 'nambuangongo',
      table: 'playerboost',
      index_position: 1,
      key_type: 'name',
      upper_bound: ual.activeUser.accountName,
      lower_bound: ual.activeUser.accountName,
      limit: 200
    };

    const userCooldowns = await ual.activeUser.client.v1.chain.get_table_rows(request1);

    let userData = {};

    if (userCooldowns.rows.length > 0) {
      userData = {
        "605907" : userCooldowns.rows[0].enforcer_boost,
        "605908" : userCooldowns.rows[0].gang_hire_boost,
        "605909" : userCooldowns.rows[0].skip_jail_time_boost,
        "605916" : userCooldowns.rows[0].safe_boost,
        "605917" : userCooldowns.rows[0].safe_boost_2,
      };
    } else {
      userData = {
        "605907" : 0,
        "605908" : 0,
        "605909" : 0,
        "605916" : 0,
        "605917" : 0,
      };
    }

    const updatedMergedData = mergedData.map(item => {
      const templateId = item.template_id.toString();
      const userBoost = userData[templateId];
      return {
        ...item,
        userBoost: userBoost,
      };
    });    

    return updatedMergedData;
  } catch (err) {
    console.error("Failed to get NFTs in wallet", err);
  }
}

export async function getPacksNFT(ual) {
  try {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=thehustlewax&schema_name=packs&page=1&limit=100&order=desc&sort=created`;

    const response = await axios.get(url);
    const nfts = response.data.data;
    const allowedTemplateIds = ["610201", "621427", "622534"]; //TO DO for mainnet
    const filteredNfts = nfts.filter(nft => allowedTemplateIds.includes(nft.template_id));

    const request = {
      json: true,
      code: 'nambuangongo',
      scope: 'nambuangongo',
      table: 'pckavailable',
      limit: 999999, // Set a high limit to fetch all the results
    };
  
    const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);

    const mappedNfts = filteredNfts.map(nft => {
      return {
        template_id: nft.template_id,
        image: nft.immutable_data.img,
        name: nft.immutable_data.name,
        description: nft.immutable_data.description,
      };
    });

    const request1 = {
      json: true,
      code: 'nambuangongo',
      scope: 'nambuangongo',
      table: 'accounts',
      index_position: 1,
      key_type: 'name',
      upper_bound: ual.activeUser.accountName,
      lower_bound: ual.activeUser.accountName,
      limit: 200
    };
  
    const account = await ual.activeUser.client.v1.chain.get_table_rows(request1);

    const mergedData = mappedNfts.map(item => {
      const matchingItem = ownedNfts.rows.find(obj => obj.template_id.toString() === item.template_id);
      if (matchingItem) {
        if(item.template_id == "610201")
        {
          return {
            ...item,
            remaining: matchingItem.remaining,
            pack_price: matchingItem.pack_price,
            total_packs: 20000,
            g_rank: true
          };
        }
        else if(item.template_id == "621427")
        {
          return {
            ...item,
            remaining: matchingItem.remaining,
            pack_price: matchingItem.pack_price,
            total_packs: 10000,
            g_rank: true
          };
        }
        else if(item.template_id == "622534")
        {
          var g_rank = false;
          if(account.rows[0].g_level > 100)
          {
            g_rank = true;
          }
          return {
            ...item,
            remaining: matchingItem.remaining,
            pack_price: matchingItem.pack_price,
            total_packs: 99999,
            g_rank: g_rank
          };
        }
      }
      return item;
    });   

    return mergedData;
  } catch (err) {
    console.error("Failed to get NFTs in wallet", err);
  }
}

export async function anchorUnstakeNFT(ual, asset_id) {
  let asset_ids;
  if (typeof asset_id === 'object') {
    asset_ids = asset_id.map(id => parseInt(id));
  } else {
    asset_ids = [parseInt(asset_id)];
  }
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'unstake',
      data: {
        to: ual.activeUser.accountName,
        asset_ids: asset_ids,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Unstake failed:', e.message);
    throw e;
  }

}

export async function anchorStakeNft(userAccount, assetId, ualApp) {
  try {
    let assetIds;
    if (typeof assetId === 'object') {
      assetIds = assetId.map(id => parseInt(id));
    } else {
      assetIds = [parseInt(assetId)];
    }

    const action = {
      account: 'atomicassets',
      name: 'transfer',
      data: {
        from: userAccount,
        to: 'nambuangongo',
        asset_ids: assetIds,
        memo: 'stake',
      },
      authorization: [
        {
          actor: userAccount,
          permission: 'active',
        },
      ],
    };
    const activeUser = ualApp.activeUser;
    const transaction = await activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Staking failed:', e.message);
    throw e;
  }
}

export async function anchorGetStakedNfts(ualApp) {
  if (!ualApp.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'staked',
    index_position: 2,
    key_type: 'name',
    upper_bound: ualApp.activeUser.accountName,
    lower_bound: ualApp.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ualApp.activeUser.client.v1.chain.get_table_rows(request);
  const userAssets = [];
  ownedNfts.rows.forEach(row => {
    userAssets.push(row.asset_nft)
  });
  return userAssets;
}

export async function anchorGetDataFromAssetId(data) {
  const parsedItems = [];
  for (const item of data) {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + item;
    const response = await axios.get(url);
    const nft = response.data.data;
    const parsedItem = {
      asset_id: nft.asset_id,
      image: nft.data.img,
      name: nft.data.name,
      description: nft.data.description,
      template_id: nft.template.template_id
    };

    // add the new object to the parsedItems array
    parsedItems.push(parsedItem);
  }
  return parsedItems
}

export async function anchorGetLaunderedInfo(ual) {
  const request1 = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'laundering',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  const userData = await ual.activeUser.client.v1.chain.get_table_rows(request1);
  var cooldown_value = 0;

  if (userData.rows.length === 0) {
    return 0;
  }

  if (userData.rows[0].immunity_pass_cd > Math.floor(Date.now() / 1000)) {
    cooldown_value = userData.rows[0].immunity_pass_cd - Math.floor(Date.now() / 1000)
  }

  const parsedItem = {
    staked_amount: userData.rows[0].staked_amount,
    staked_time: userData.rows[0].staked_time,
    unstaked_time: userData.rows[0].unstaked_time,
    last_staked_time: userData.rows[0].initial_staked_time,
    amount_to_unstake: userData.rows[0].amount_to_unstake,
    total_staked: userData.rows[0].total_staked,
    total_laundered: userData.rows[0].total_laundered,
    total_burned: userData.rows[0].total_burned
  };
  return parsedItem;
}

export async function anchorCollectLaundering(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'claimdirty',
      data: {
        user: ual.activeUser.accountName,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Claiming Laundering failed:', e.message);
    throw e;
  }
}

export async function anchorCollectUnstaked(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'getunstdirty',
      data: {
        user: ual.activeUser.accountName,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Claiming Laundering failed:', e.message);
    throw e;
  }
}

export async function anchorStakeDirtyLaundering(ual, amount) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'stakedirtycs',
      data: {
        user: ual.activeUser.accountName,
        value: amount
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Claiming Laundering failed:', e.message);
    throw e;
  }
}

export async function anchorUnstakeDirtyLaundering(ual, amount) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'unstakedirty',
      data: {
        user: ual.activeUser.accountName,
        value: amount
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Claiming Laundering failed:', e.message);
    throw e;
  }
}

export async function anchorGetDataFromImmunityPass(data, ual) {
  const parsedItems = [];
  const request1 = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  const userData = await ual.activeUser.client.v1.chain.get_table_rows(request1);
  var cooldown_value = 0;

  if (userData.rows[0].immunity_pass_cd > Math.floor(Date.now() / 1000)) {
    cooldown_value = userData.rows[0].immunity_pass_cd - Math.floor(Date.now() / 1000)
  }

  for (const item of data) {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + item;
    const response = await axios.get(url);

    const nft = response.data.data;
    const parsedItem = {
      asset_id: nft.asset_id,
      image: nft.data.img,
      name: nft.data.name,
      template_id: nft.template.template_id,
      cooldown: cooldown_value
    };

    // add the new object to the parsedItems array
    parsedItems.push(parsedItem);
  }
  return parsedItems
}

export async function anchorGetDataFromAssetIdJailPass(data, ual) {
  const parsedItems = [];

  const request1 = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const userData = await ual.activeUser.client.v1.chain.get_table_rows(request1);

  for (const item of data) {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + item;
    const response = await axios.get(url);
    const nft = response.data.data;
    var value = userData.rows[0].consignment_get_out_of_jail - Math.floor(Date.now() / 1000);
    const parsedItem = {
      asset_id: nft.asset_id,
      image: nft.data.img,
      name: nft.data.name,
      template_id: nft.template.template_id,
      cooldown: value > 1 ? value : 0
    };

    // add the new object to the parsedItems array
    parsedItems.push(parsedItem);
  }
  return parsedItems
}

export async function anchorGetDataFromAssetIdBooster(data, ual) {
  const parsedItems = [];
  const templateIds = ["605907", "605908", "605909", "605910"];

  const request1 = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const userData = await ual.activeUser.client.v1.chain.get_table_rows(request1);


  for (const item of data) {
    var value = 0;
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + item;
    const response = await axios.get(url);
    const nft = response.data.data;
    if (templateIds.includes(nft.template.template_id)) {
      if (nft.template.template_id === "605907") //enforcer
      {
        value = userData.rows[0].enforcer_cd - Math.floor(Date.now() / 1000);
      }
      else if (nft.template.template_id === "605908") //gang hire
      {
        value = userData.rows[0].gang_hire_cd - Math.floor(Date.now() / 1000);
      }
      else if (nft.template.template_id === "605909") //SKip Jail
      {
        value = userData.rows[0].skip_jail_time_cd - Math.floor(Date.now() / 1000);
      }
      else if (nft.template.template_id === "605910") //production
      {
        value = userData.rows[0].production_cd - Math.floor(Date.now() / 1000);
      }
    }
    const parsedItem = {
      asset_id: nft.asset_id,
      image: nft.data.img,
      name: nft.data.name,
      template_id: nft.template.template_id,
      cooldown: value > 1 ? value : 0
    };

    // add the new object to the parsedItems array
    parsedItems.push(parsedItem);
  }
  return parsedItems
}

export async function isConsignmentStaked(ual) {
  if (!ual.activeUser) {
    return ["", ""]
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return ["", ""];
  }
  else {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + ownedNfts.rows[0].asset_nft;
    const response = await axios.get(url);
    const nft = response.data.data;

    return ["https://ipfs.io/ipfs/" + nft.data.img, nft.asset_id];
  }
}

export async function isJailed(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return 0;
  }
  else {
    return ownedNfts.rows[0].is_jailed;

  }
}
export async function Laundering_rank(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return 0;
  }
  else {
    return ownedNfts.rows[0].is_jailed;

  }
}

export async function isJailedTime(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return 0;
  }
  else {
    if (ownedNfts.rows[0].jail_until < (Date.now() / 1000)) {
      return 1;  //If should get out of jail
    }
    else
      return 0; //If should not get out of jail

  }
}

export async function getTimeLeftInJail(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return 0;
  }
  else {
    if (ownedNfts.rows[0].jail_until < Date.now() / 1000) {
      return 0;
    }
    else
      return Math.floor(ownedNfts.rows[0].jail_until - Date.now() / 1000);

  }
}

export async function getTimeToUpgrade(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'staked',
    index_position: 1,
    key_type: 'i64',
    upper_bound: asset_id,
    lower_bound: asset_id,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return 0;
  }
  if (ownedNfts.rows[0].cooldown > Date.now() / 1000) {

    return ownedNfts.rows[0].cooldown - Math.floor(Date.now() / 1000);
  }
  else {
    return 0;
  }
}

export async function getTimeToClaim(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return 0;
  }
  else {
    if (ownedNfts.rows[0].last_claimed > Date.now() / 1000) {
      return ownedNfts.rows[0].last_claimed - Math.floor(Date.now() / 1000);
    }
    else {
      return 0;
    }

  }
}

export async function mineConsignment(ual, asset_id) {

  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'mineconsign',
      data: {
        user: ual.activeUser.accountName,
        asset_id: asset_id,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Paying bail failed:', e.message);
    throw e;
  }
}

export async function getOutOfJailPass(ual, asset_id, booster_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'postbail',
      data: {
        user: ual.activeUser.accountName,
        transporter_id: asset_id,
        booster_id: booster_id,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Paying bail failed:', e.message);
    throw e;
  }
}

export async function getIfWorkingConsignment(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 2,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return -1;
  }
  else {
    return ownedNfts.rows[0].is_claimed;

  }
}

export async function getLastActionMessage(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'lastaction',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const lastAction = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (lastAction.rows.length === 0) {
    return -1;
  }
  else {
    return lastAction.rows[0].result;

  }
}

export async function getOutOfJail(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'getoutjail',
      data: {
        user: ual.activeUser.accountName,
        asset_id: asset_id,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Paying bail failed:', e.message);
    throw e;
  }
}

export async function getConsignmentRewards(assetId, ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + assetId;
  const response = await axios.get(url);
  const nft = response.data.data;
  var level = 0;

  if (nft.data !== undefined && nft.data.level !== undefined) {

    level = nft.data.level;
  }
  else
  {
    return 0;
  }

  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostlvl',
    index_position: 1,
    key_type: 'i32',
    upper_bound: parseInt(level),
    lower_bound: parseInt(level),
    limit: 200
  };

  const request1 = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  var returnValue = 1;
  const userData = await ual.activeUser.client.v1.chain.get_table_rows(request1);
  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.length !== 0) {
    if (userData.rows[0].production_booster > 0) {
      returnValue += 0.2;
    }
    if (userData.rows[0].gang_hire_booster > 0) {
      returnValue += 0.2;
    }
    return (returnValue * 3600 * ownedNfts.rows[0].dirty_cash_s).toFixed(3);
  }
  else
    return 0;
}

export async function getConsignmentBailCost(assetId, ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + assetId;
  const response = await axios.get(url);
  const nft = response.data.data;

  var level = 0;

  if (nft.data !== undefined && nft.data.level !== undefined) {
    level = nft.data.level;
  }

  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostlvl',
    index_position: 1,
    key_type: 'i32',
    upper_bound: parseInt(level),
    lower_bound: parseInt(level),
    limit: 200
  };
  var returnValue = 0;
  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.length !== 0) {
    returnValue = parseFloat(ownedNfts.rows[0].bail_cost).toFixed(2);
  }
  return returnValue;
}

export async function getConsignmentStats(ual, assetId) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + assetId;
  const response = await axios.get(url);
  const nft = response.data.data;

  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostlvl',
    index_position: 1,
    key_type: 'i32',
    upper_bound: parseInt(nft.data.level),
    lower_bound: parseInt(nft.data.level),
    limit: 200
  };
  var returnValue = 0;
  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows[0] !== undefined) {
    return (parseFloat(ownedNfts.rows[0].dirty_cash_s) * 3600).toFixed(2);
  }
  return returnValue;
}

export async function collectConsignment(assetId, ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'claimconsign',
      data: {
        user: ual.activeUser.accountName,
        asset_id: assetId,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
  } catch (e) {
    console.log('Unstaking failed:', e.message);
    throw e;
  }
}

export async function payBail(assetId, ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'paybail',
      data: {
        user: ual.activeUser.accountName,
        asset_id: assetId,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Paying bail failed:', e.message);
    throw e;
  }
}

export async function reUp(ual, value) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'reup',
      data: {
        user: ual.activeUser.accountName,
        dirty_cash: value,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Reup failed:', e.message);
    throw e;
  }
}


export async function anchortGetNftInformation(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + asset_id;
  const response = await axios.get(url);
  const nft = response.data.data;
  const data = []

  data.push({ name: nft.name, level: nft.data.level, rarity: nft.data.rarity, type: nft.data.type, edition: nft.data.edition });
  return data;

}

export async function unstakeConsignment(assetId, ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'rmvtransport',
      data: {
        user: ual.activeUser.accountName,
        asset_id: assetId
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active'
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Unstaking failed:', e.message);
    throw e;
  }
}

export async function anchorAddBoostToConsignment(asset_id, ual) {
  try {
    const action = {
      account: 'nambuangongo',
      name: 'addconsignb',
      data: {
        user: ual.activeUser.accountName,
        booster_id: asset_id
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Adding booster to consignment failed:', e.message);
    throw e;
  }
}

export async function anchorAddToConsignment(asset_id, ual) {
  try {
    const action = {
      account: 'nambuangongo',
      name: 'addtransprt',
      data: {
        user: ual.activeUser.accountName,
        asset_id: asset_id
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Adding to consignment failed:', e.message);
    throw e;
  }
}

export async function anchorGetBalance(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.length !== 0) {
    return ownedNfts.rows[0].balances;
  }
}

export async function anchorGetStakedLaundering(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'laundering',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.length !== 0) {
    return ownedNfts.rows[0].staked_amount;
  }
}

export async function anchorGetConsignmentSlots(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (account.length !== 0) {
    return account.rows[0].consignment_slots;
  }
}

export async function anchorGetGRank(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (account.length !== 0) {

    return account.rows[0].g_level;
  }
}
export async function anchorGetMPower(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const miningAssets = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 1,
    key_type: 'name',
    limit: 200

  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(miningAssets);
  let miningpowerValue = [];
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostlvl',
    index_position: 1,
    key_type: 'i32',
    limit: 200

  };
  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);

  for (let i = 0; i < account.rows.length; i++) {
    if (account.rows[i].owner != ual.activeUser.accountName) {
      continue;
    }
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + account.rows[i].asset_nft;
    const response = await axios.get(url);
    const nft = response.data.data;
    var level = 0;

    if (nft.data !== undefined && nft.data.level !== undefined) {

      level = nft.data.level;
    }

    if (ownedNfts.length !== 0) {
      miningpowerValue = parseFloat((ownedNfts.rows[level].dirty_cash_s));
      break;

    }
  }

  return miningpowerValue;
}
export async function anchorGetMLCleanCashe(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'laundering',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200

  };
  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
  // let LCleanCasheValue = 0;
  console.log("ggge", account);
  if (account.rows.length === 0) {
    throw new Error('No rows found in the account data');
  }
  console.log("ggge", account);
  if (!account.rows[0].total_laundered) {
    throw new Error('Total laundered value not found');
  }
  return parseFloat(account.rows[0].total_laundered).toFixed(6);
}
export async function anchorGetuserinfors(ual, option) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (account.length !== 0) {
    console.log("reuslt", option, account.rows[0][option])
    return account.rows[0][option];
  }
}
// export async function anchorGetSuccessDrop(ual) {
//   if (!ual.activeUser) {
//     throw new Error('No active user found');
//   }
//   const request = {
//     json: true,
//     code: 'nambuangongo',
//     scope: 'nambuangongo',
//     table: 'accounts',
//     index_position: 1,
//     key_type: 'name',
//     upper_bound: ual.activeUser.accountName,
//     lower_bound: ual.activeUser.accountName,
//     limit: 200
//   };

//   const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
//   if (account.length !== 0) {

//     return account.rows[0].successful_drops;
//   }
// }
function sortarray(arr) {
  var arr2 = arr.map(function (o, i) { return { idx: i, obj: o }; }).sort(function (a, b) {
    return b.obj - a.obj;
  });
  for (var i = 0, j = arr2.length; i < j; i++) {
    arr[i] = arr2[i].idx + 1;
  }
  return arr;
}
export async function MiningPowerRank(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }

  const miningAssets = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'consignment',
    index_position: 1,
    key_type: 'name',
    limit: 200

  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(miningAssets);
  let miningpowerValue = [];
  let miningpowerUser = [];
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostlvl',
    index_position: 1,
    key_type: 'i32',
    limit: 200

  };
  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);

  for (let i = 0; i < account.rows.length; i++) {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + account.rows[i].asset_nft;
    const response = await axios.get(url);
    const nft = response.data.data;
    var level = 0;

    if (nft.data !== undefined && nft.data.level !== undefined) {

      level = nft.data.level;
    }

    if (ownedNfts.length !== 0) {
      miningpowerValue.push(parseFloat((ownedNfts.rows[level].dirty_cash_s)).toFixed(6));
      miningpowerUser.push(account.rows[i].owner);

    }
  }
  let Mresult = [];
  let _reM = [];
  for (let i = 0; i < miningpowerValue.length; i++) {
    _reM.push(miningpowerValue[i]);
  }
  let result = sortarray(_reM);

  if (account.rows.length < 100) {
    for (let i = 0; i < result.length; i++) {
      let _result = [];
      _result.push(miningpowerUser[result[i] - 1]);
      _result.push(parseFloat(miningpowerValue[result[i] - 1]));
      Mresult.push(_result);
    }
  }
  else {
    for (let i = 0; i < 100; i++) {
      let _result = [];
      _result.push(miningpowerUser[result[i] - 1]);
      _result.push(parseFloat(miningpowerValue[result[i] - 1]));
      Mresult.push(_result);
    }
  }
  return Mresult;

}
export async function G_XPRank(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    limit: 200
  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (account.length !== 0) {
    let array = [];
    let G_rankresult = [];
    for (let i = 0; i < account.rows.length; i++) {
      array.push(account.rows[i].g_level)
    }
    array = sortarray(array);
    if (account.rows.length < 100) {
      for (let i = 0; i < array.length; i++) {
        let _result = [];
        _result.push(account.rows[array[i] - 1].account);
        _result.push(parseFloat(account.rows[array[i] - 1].g_level));
        G_rankresult.push(_result);
      }
    }
    else {
      for (let i = 0; i < 100; i++) {
        let _result = [];
        _result.push(account.rows[array[i] - 1].account);
        _result.push(parseFloat(account.rows[array[i] - 1].g_level));
        G_rankresult.push(_result);
      }
    }
    return G_rankresult;
  }
}
export async function DropRank(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    limit: 200

  };
  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);

  if (account.length !== 0) {
    let array = [];
    let DropResult = [];
    for (let i = 0; i < account.rows.length; i++) {
      array.push(account.rows[i].successful_drops)
    }
    console.log("drop=>", array)
    array = sortarray(array);
    if (account.rows.length < 100) {
      for (let i = 0; i < array.length; i++) {
        let _result = [];
        _result.push(account.rows[array[i] - 1].account);
        _result.push(parseFloat(account.rows[array[i] - 1].successful_drops));
        DropResult.push(_result);
      }
    }
    else {
      for (let i = 0; i < 100; i++) {
        let _result = [];
        _result.push(account.rows[array[i] - 1].account);
        _result.push(parseFloat(account.rows[array[i] - 1].successful_drops));
        DropResult.push(_result);
      }
    }
    return DropResult;
  }
}
export async function Leader_L_rank(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'laundering',
    index_position: 1,
    key_type: 'name',
    limit: 200

  };
  const userData = await ual.activeUser.client.v1.chain.get_table_rows(request);
  var cooldown_value = 0;

  if (userData.rows.length === 0) {
    return 0;
  }

  let array = [];
  let launderingresult = [];
  for (let i = 0; i < userData.rows.length; i++) {
    array.push(userData.rows[i].total_laundered)
  }
  array = sortarray(array);
  if (userData.rows.length < 100) {
    for (let i = 0; i < array.length; i++) {
      let _result = [];
      _result.push(userData.rows[array[i] - 1].owner);
      _result.push(parseFloat((userData.rows[array[i] - 1].total_laundered)).toFixed(3));
      launderingresult.push(_result);
    }
  }
  else {
    for (let i = 0; i < 100; i++) {
      let _result = [];
      _result.push(userData.rows[array[i] - 1].owner);
      _result.push(parseFloat((userData.rows[array[i] - 1].total_laundered)).toFixed(3));
      launderingresult.push(_result);
    }
  }

  return launderingresult;
}


export async function anchorGetConsignmentBoostersInfo(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.length !== 0) {
    var total = 0;
    const slots = []
    if (ownedNfts.rows[0].enforcer_booster > 0) {
      const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + ownedNfts.rows[0].enforcer_booster;
      const response = await axios.get(url);
      const nft = response.data.data;
      slots.push({ id: total, image: "https://ipfs.io/ipfs/" + nft.data.img });
      total++;
    }
    if (ownedNfts.rows[0].gang_hire_booster > 0) {
      const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + ownedNfts.rows[0].gang_hire_booster;
      const response = await axios.get(url);
      const nft = response.data.data;
      slots.push({ id: total, image: "https://ipfs.io/ipfs/" + nft.data.img });
      total++;
    }
    if (ownedNfts.rows[0].skip_jail_time_booster > 0) {
      const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + ownedNfts.rows[0].skip_jail_time_booster;
      const response = await axios.get(url);
      const nft = response.data.data;
      slots.push({ id: total, image: "https://ipfs.io/ipfs/" + nft.data.img });
      total++;
    }
    if (ownedNfts.rows[0].production_booster > 0) {
      const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + ownedNfts.rows[0].production_booster;
      const response = await axios.get(url);
      const nft = response.data.data;
      slots.push({ id: total, image: "https://ipfs.io/ipfs/" + nft.data.img });
      total++;
    }
    return slots;
  }
}

export async function anchorGetConsignmentBoosters(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.length !== 0) {
    var total = 0;
    if (ownedNfts.rows[0].enforcer_booster > 0) {
      total++;
    }
    if (ownedNfts.rows[0].gang_hire_booster > 0) {
      total++;
    }
    if (ownedNfts.rows[0].skip_jail_time_booster > 0) {
      total++;
    }
    if (ownedNfts.rows[0].production_booster > 0) {
      total++;
    }
    return total;
  }
}

export async function anchorUpgradeConsignment(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'upgrdghost',
      data: {
        user: ual.activeUser.accountName,
        asset_id: asset_id
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active'
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Upgrading Ghost failed:', e.message);
    throw e;
  }
}

export async function anchorSkipConsignmentUpgradeTime(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'bypassghost',
      data: {
        user: ual.activeUser.accountName,
        asset_id: asset_id
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active'
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Upgrading Ghost failed:', e.message);
    throw e;
  }
}

export async function getUpgradeCostsForConsignmentBooster(ual, index) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }

  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'boostupgrd',
    index_position: 1,
    key_type: 'i32',
    upper_bound: parseInt(index + 1),
    lower_bound: parseInt(index + 1),
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows[0] !== undefined) {
    return ownedNfts.rows[0];
  }
  else {

    const upgradeSlotsCost = [];
    upgradeSlotsCost.push({
      clean_cash: 0,
      dirty_cash: 0,
      hustler_token: 0,
      slot_number: 0,
      upgrade_token: 0
    });
    return upgradeSlotsCost;
  }
}

export async function getUpgradeCostsForGhost(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }

  const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + asset_id;
  const response = await axios.get(url);
  const nft = response.data.data;

  const level = parseInt(nft.data.level)
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostupgrds',
    index_position: 1,
    key_type: 'i32',
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);

  if (ownedNfts.rows[level] !== undefined) {
    const formattedData = {
      ...ownedNfts.rows[level],
      dirty_cash: parseFloat(ownedNfts.rows[level].dirty_cash).toFixed(2)
    };
    return formattedData;
  }
  else {
    const upgradeSlotsCost = [];
    upgradeSlotsCost.push({
      clean_cash: 0,
      dirty_cash: 0,
      hustler_token: 0,
      upgrade_token: 0,
      b_dirty_cash: 0,
      b_clean_cash: 0,
      b_hustlers_token: 0
    });
    return upgradeSlotsCost;
  }
}

export async function getSkipUpgradeCostsForGhost(ual, asset_id) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }

  const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + asset_id;
  const response = await axios.get(url);
  const nft = response.data.data;

  var level1 = 0;

  if (nft.data !== undefined && nft.data.level !== undefined) {
    level1 = nft.data.level;
  }

  var level = parseInt(level1)
  if (level != 0) {
    level -= 1;
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'ghostupgrds',
    index_position: 1,
    key_type: 'i32',
    limit: 200
  };

  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);

  if (ownedNfts.rows[level] !== undefined) {
    const formattedData = {
      ...ownedNfts.rows[level],
      b_dirty_cash: parseFloat(ownedNfts.rows[level].b_dirty_cash).toFixed(2)
    };
    return formattedData;
  }
  else {
    const upgradeSlotsCost = [];
    upgradeSlotsCost.push({
      b_dirty_cash: 0,
      b_clean_cash: 0,
      b_hustlers_token: 0
    });
    return upgradeSlotsCost;
  }
}

export async function anchorAddBoosterSlotsConsignment(ual) {
  try {
    const action = {
      account: 'nambuangongo',
      name: 'upgrdcbslots',
      data: {
        user: ual.activeUser.accountName
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Upgrading booster slots in consignment failed:', e.message);
    throw e;
  }
}

export async function anchorGetUserResourcesFromWallet(ual) {
  try {
    const request = {
      json: true,
      code: 'nambuatokens',
      scope: ual.activeUser.accountName,
      table: 'accounts',
      limit: 10,
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    };

    const result = await ual.activeUser.client.v1.chain.get_table_rows(request);

    var tokenList = []
    result.rows.forEach((row) => {
      const balances = row.balance.split(' ')
      const tokenSymbol = balances[1]
      const tokenValue = parseFloat(balances[0])
      const token = {
        key: tokenSymbol,
        value: tokenValue
      }
      tokenList.push(token)
    })
    return tokenList
  }
  catch (e) {
    console.log('Upgrading booster slots in consignment failed:', e.message);
    throw e;
  }
}

export async function anchorDepositTokens(ual, assets) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  console.log("cur")
  try {
    const action = {
      account: 'nambuatokens',
      name: 'transfer1',
      data: {
        from: ual.activeUser.accountName,
        to: 'nambuangongo',
        quantity: assets,
        memo: 'exchange'
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Deposit failed:', e.message);
    throw e;
  }
}

export async function anchorWithdrawCleanCashHustlerToken(ual, assets) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'exchangetkn',
      data: {
        user: ual.activeUser.accountName,
        to_exchange: assets,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Deposit failed:', e.message);
    throw e;
  }
}

export async function anchorExchangeCleanCashToHustler(ual, value) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'exchangeccht',
      data: {
        user: ual.activeUser.accountName,
        value: value,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Exchange failed:', e.message);
    throw e;
  }
}

export async function anchorAddImmunity(asset_id, ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  try {
    const action = {
      account: 'nambuangongo',
      name: 'addimmunity',
      data: {
        user: ual.activeUser.accountName,
        asset_id: asset_id,
      },
      authorization: [
        {
          actor: ual.activeUser.accountName,
          permission: 'active',
        },
      ],
    };

    const transaction = await ual.activeUser.signTransaction({
      actions: [action],
    }, { broadcast: true });

    console.log(`Transaction broadcast! Id: ${transaction.transaction_id}`);
    return true;
  } catch (e) {
    console.log('Paying bail failed:', e.message);
    throw e;
  }
}

export async function isImmunityStaked(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  const ownedNfts = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (ownedNfts.rows.length === 0) {
    return ["", ""];
  }
  else if (ownedNfts.rows[0].immunity_pass === 0) {
    return ["", ""];
  }
  else {
    const url = `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/` + ownedNfts.rows[0].immunity_pass;
    const response = await axios.get(url);
    const nft = response.data.data;

    return ["https://ipfs.io/ipfs/" + nft.data.img, nft.asset_id];
  }
}

export async function anchorGetFailedDrops(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  const values = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (values.rows.length === 0) {
    return 0;
  }
  else {
    const counter = values.rows[0].times_failed_drop.reduce((accumulator, number) => {
      if (number > Math.floor(Date.now() / 1000)) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    return counter;
  }
}

export async function anchorGetTotalDrops(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  const values = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (values.rows.length === 0) {
    return 0;
  }
  else {
    const counter = values.rows[0].one_hundred_one_thousand.reduce((accumulator, number) => {
      if (number > Math.floor(Date.now() / 1000)) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    const counter1 = values.rows[0].one_thousand_infinity.reduce((accumulator, number) => {
      if (number > Math.floor(Date.now() / 1000)) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    const counter2 = values.rows[0].dirty_cash_token_cooldown.reduce((accumulator, number) => {
      if (number > Math.floor(Date.now() / 1000)) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    return counter + counter1 + counter2;
  }
}
export async function anchorGetHustlerTokenWithdraws(ual) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };
  const values = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (values.rows.length === 0) {
    return 0;
  }
  else {
    const counter = values.rows[0].hustler_token_cooldown.reduce((accumulator, number) => {
      if (number > Math.floor(Date.now() / 1000)) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    return counter;
  }
}

export async function anchorGetSCCount(ual, option) {
  if (!ual.activeUser) {
    throw new Error('No active user found');
  }
  const request = {
    json: true,
    code: 'nambuangongo',
    scope: 'nambuangongo',
    table: 'accounts',
    index_position: 1,
    key_type: 'name',
    upper_bound: ual.activeUser.accountName,
    lower_bound: ual.activeUser.accountName,
    limit: 200
  };

  const account = await ual.activeUser.client.v1.chain.get_table_rows(request);
  if (account.length !== 0) {
    console.log("reuslt", option, account.rows[0][option])
    return account.rows[0][option];
    
  }
}