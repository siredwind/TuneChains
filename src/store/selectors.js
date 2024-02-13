import { createSelector } from "reselect";
import { ethers } from "ethers";

export const selectProvider = state => state.provider.connection;
export const selectChainId = state => state.provider?.chainId;
export const selectAccount = state => state.provider.account;
export const selectToken = state => state.token.contract;
export const selectMC = state => state.mc.contract;
export const selectActiveCampaignCount = state => state.mc.activeCampaignCount;
export const selectCampaignCount = state => state.mc.campaignCount;
export const selectCampaigns = state => state.mc.campaigns;
export const selectSocialLinks = state => state.mc.socialLinks;

export const campaignSelector = createSelector(selectCampaigns, (campaigns) => {
    if (!campaigns || campaigns.length === 0) { return }

    const allCampaigns = campaigns.reduce((acc, campaign) => {
        const goal = campaign[5] ? ethers.utils.formatEther(campaign[5]) : 0;
        const raised = campaign[6] ? ethers.utils.formatEther(campaign[6]) : 0;

        const campaignDetails = {
            id: parseInt(campaign[0]),
            musician: campaign[1],
            title: campaign[2],
            description: campaign[3],
            url: campaign[4],
            goal: goal,
            raised: raised,
            deadline: new Date((campaign[7]).toString() * 1000).toLocaleString(),
            closed: campaign[8]
        }

        if (campaignDetails) acc.push(campaignDetails);
        return acc;
    }, []);

    const sortedCampaigns = [...allCampaigns].sort((a, b) => b.id - a.id);

    return sortedCampaigns;
})