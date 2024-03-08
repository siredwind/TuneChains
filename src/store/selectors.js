import { createSelector } from "reselect";

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
    if (!campaigns || campaigns.length === 0) { return };

    const sortedCampaigns = [...campaigns].sort((a, b) => b.id - a.id);

    return sortedCampaigns;
})