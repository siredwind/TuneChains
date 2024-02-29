import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import {
    defaultRequestState,
    handleFulfilled,
    handlePending,
    handleRejected
} from "../utils";

export const mc = createSlice({
    name: 'mc',
    initialState: {
        contract: null,
        activeCampaignCount: null,
        campaigns: [],
        campaignCount: null,
        socialLinks: [],
        creating: { ...defaultRequestState },
        updating: { ...defaultRequestState },
        funding: { ...defaultRequestState },
        closing: { ...defaultRequestState }
    },
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload;
        },
        activeCampaignCountLoaded: (state, action) => {
            state.activeCampaignCount = action.payload;
        },
        campaignsLoaded: (state, action) => {
            state.campaigns = action.payload;
        },
        campaignCountLoaded: (state, action) => {
            state.campaignCount = action.payload;
        },
        socialLinksLoaded: (state, action) => {
            state.socialLinks = action.payload;
        },
        createRequest: (state) => {
            handlePending(state);
        },
        createSuccess: (state, action) => {
            handleFulfilled(state, action);

            const campaignId = parseInt(state.campaignCount) + 1;
            const campaign = action.payload.campaign;
            const goal = ethers.utils.parseUnits(campaign.goal.toString(), 'wei');
            const raised = ethers.utils.parseUnits('0', 'wei');

            // Add one more campaign to active campaigns
            state.activeCampaignCount = parseInt(state.activeCampaignCount) + 1;

            // Add one more campaign to campaigns
            state.campaignCount = campaignId;

            // Add campaign to campaigns
            state.campaigns[campaignId] = [
                campaignId,
                campaign.musician,
                campaign.title,
                campaign.description,
                campaign.url,
                goal,
                raised,
                campaign.deadline,
                false,
            ]
        },
        createFail: (state) => {
            handleRejected(state);
        },
        fundRequest: (state) => {
            handlePending(state);
        },
        fundSuccess: (state, action) => {
            handleFulfilled(state, action);
            const { campaignId, amount } = action.payload;

            // Find the campaign and update its raised amount
            const campaignIndex = state.campaigns
                .findIndex(c => parseInt(c[0]) === parseInt(campaignId));

            if (campaignIndex !== -1) {
                // Assuming the amount is in wei and needs to be converted to ether
                const newAmount = ethers.utils.parseUnits(amount.toString(), 'wei');
                const existingAmount = ethers.utils.parseUnits(state.campaigns[campaignIndex][6].toString(), 'wei');

                // Use BigNumber addition
                const updatedAmount = newAmount.add(existingAmount);

                // Convert back to a readable format if necessary
                state.campaigns[campaignIndex][6] = ethers.utils.formatUnits(updatedAmount, 'wei');
            }
        },
        fundFail: (state) => {
            handleRejected(state);
        },
        updateRequest: (state) => {
            handlePending(state);
        },
        updateSuccess: (state, action) => {
            handleFulfilled(state, action);
        },
        updateFail: (state) => {
            handleRejected(state);
        },
        closeRequest: (state) => {
            handlePending(state);
        },
        closeSuccess: (state, action) => {
            handleFulfilled(state, action);

            // remove one campaign from active campaigns
            state.activeCampaignCount = parseInt(state.activeCampaignCount) - 1;

            // remove campaign from campaigns
            state.campaigns = state.campaigns.filter(campaign =>
                parseInt(campaign[0]) !== parseInt(action.payload.campaignId)
            );
        },
        closeFail: (state) => {
            handleRejected(state);
        }
    }
})

export const {
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
} = mc.actions;

export default mc.reducer;