import { ethers } from 'ethers'

import {
    setProvider,
    setNetwork,
    setAccount
} from './reducers/provider'

import {
    setContracts,
    setSymbol,
    balanceLoaded
} from './reducers/token'

import {
    setContract,
    campaignsLoaded,
    socialLinksLoaded,
    activeCampaignCountLoaded,
    campaignCountLoaded,
    createRequest,
    createSuccess,
    createFail,
    fundRequest,
    fundSuccess,
    fundFail,
    updateRequest,
    updateSuccess,
    updateFail,
    closeRequest,
    closeSuccess,
    closeFail
} from './reducers/mc'

import TOKEN_ABI from '../abis/Token.json';
import MC_ABI from '../abis/MusicCrowdfunding.json';
import config from '../config.json';

export const loadProvider = (dispatch) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    dispatch(setProvider(provider));

    return provider;
}

export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork();
    if (chainId)
        dispatch(setNetwork(chainId));

    return chainId;
}

export const loadAccount = async (dispatch) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0]);

    dispatch(setAccount(account));

    return account;
}

// ------------------------------------------------------------------------------
// LOAD CONTRACTS
export const loadToken = async (provider, chainId, dispatch) => {
    try {
        const token = new ethers.Contract(config[chainId].token.address, TOKEN_ABI, provider);

        dispatch(setContracts(token));
        dispatch(setSymbol(await token.symbol()));
    }
    catch (error) {
        console.log("[ERROR] loadToken() - ", error);
    }
}

export const loadMC = async (provider, chainId, dispatch) => {
    const mc = new ethers.Contract(config[chainId].mc.address, MC_ABI, provider);
    dispatch(setContract(mc));

    return mc;
}

// ------------------------------------------------------------------------------
// LOAD BALANCES, CAMPAIGNS, SOCIAL LINKS, CAMPAIGN COUNT & ACTIVE CAMPAIGN COUNT
export const loadBalance = async (token, account, dispatch) => {
    try {
        const balance = await token.balanceOf(account);
        dispatch(balanceLoaded(ethers.utils.formatUnits(balance.toString(), 'ether')));

        return ethers.utils.formatUnits(balance.toString(), 'ether');
    }
    catch (error) {
        console.log("[ERROR] loadBalance() - ", error);
    }
}

// ------------------------------------------------------------------------------
// LOAD CAMPAIGNS, SOCIAL LINKS, CAMPAIGN COUNT & ACTIVE CAMPAIGN COUNT
export const loadCampaigns = async (mc, dispatch) => {
    try {
        const campaignCount = parseInt(await mc.campaignCount());
        dispatch(campaignCountLoaded(campaignCount));

        const activeCampaignCount = await mc.activeCampaignCount();
        dispatch(activeCampaignCountLoaded(activeCampaignCount));

        if (campaignCount > 0) {
            let campaigns = [];
            for (let id = 1; id <= campaignCount; id++) {
                const campaignDetail = await mc.getCampaignDetails(id);
                const campaign = {
                    id: parseInt(campaignDetail[0]._hex, 16),
                    musician: campaignDetail[1],
                    title: campaignDetail[2],
                    description: campaignDetail[3],
                    url: campaignDetail[4],
                    goal: ethers.utils.formatEther(campaignDetail[5]) || 0,
                    raised: ethers.utils.formatEther(campaignDetail[6]) || 0,
                    deadline: new Date((campaignDetail[7]).toString() * 1000).toLocaleString(),
                    closed: campaignDetail[8],
                };
                campaigns.push(campaign);
            }
            dispatch(campaignsLoaded(campaigns));

            let socialLinks = [];
            for (let id = 1; id <= campaignCount; id++) {
                const campaignSocialLinks = await mc.getSocialLinks(id);
                socialLinks.push(campaignSocialLinks);
            }
            dispatch(socialLinksLoaded(socialLinks));
        }
    }
    catch (error) {
        console.log("[ERROR] loadCampaigns() - ", error);
    }
}

// ------------------------------------------------------------------------------
// CREATE CAMPAIGN
export const createCampaign = async (provider, mc, title, description, url, goal, deadline, dispatch) => {
    try {
        dispatch(createRequest());

        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        let transaction;
        transaction = await mc.connect(signer).createCampaign(
            title,
            description,
            url,
            goal,
            deadline
        );
        await transaction.wait();

        dispatch(createSuccess({
            transactionHash: transaction.hash,
            campaign: {
                musician: signerAddress,
                title: title,
                description: description,
                url: url,
                goal: goal,
                deadline: deadline
            }
        }));

        return transaction.hash;
    } catch (error) {
        dispatch(createFail(error.message));
        return null;
    }
}

// ------------------------------------------------------------------------------
// FUND CAMPAIGN
export const fundCampaign = async (provider, mc, token, campaignId, amount, dispatch) => {
    try {
        dispatch(fundRequest());

        const signer = await provider.getSigner();

        let transaction;
        transaction = await token.connect(signer).approve(mc.address, amount);
        await transaction.wait();

        transaction = await mc.connect(signer).fundCampaign(campaignId, amount);
        await transaction.wait();

        dispatch(fundSuccess({
            transactionHash: transaction.hash,
            campaignId: campaignId,
            amount: amount
        }));
    } catch (error) {
        dispatch(fundFail(error.message));
    }
}

// ------------------------------------------------------------------------------
// CLOSE CAMPAIGN
export const closeCampaign = async (provider, mc, campaignId, dispatch) => {
    try {
        dispatch(closeRequest());

        const signer = await provider.getSigner();

        let transaction;
        transaction = await mc.connect(signer).closeCampaign(campaignId);
        await transaction.wait();

        dispatch(closeSuccess({
            transactionHash: transaction.hash,
            campaignId: campaignId
        }));
    } catch (error) {
        dispatch(closeFail(error.message));
    }
}

// ------------------------------------------------------------------------------
// UPDATE SOCIAL LINKS
export const updateSocialLinks = async (
    provider,
    mc,
    campaignId,
    facebook,
    instagram,
    tiktok,
    youtube,
    twitter,
    github,
    dispatch
) => {
    try {
        dispatch(updateRequest());

        const signer = await provider.getSigner();

        let transaction;
        transaction = await mc.connect(signer).updateSocialLinks(
            campaignId,
            facebook,
            instagram,
            tiktok,
            youtube,
            twitter,
            github
        );
        await transaction.wait();

        dispatch(updateSuccess({ transactionHash: transaction.hash }));
    } catch (error) {
        dispatch(updateFail(error.message));
    }
}