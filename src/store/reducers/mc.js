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

            // Add one more campaign to active campaigns
            state.activeCampaignCount = parseInt(state.activeCampaignCount) + 1;

            // Add one more campaign to campaigns
            state.campaignCount = campaignId;

            // Calculate the deadline date by adding the duration (in days) to the current date
            const deadlineDate = new Date();
            deadlineDate.setDate(deadlineDate.getDate() + parseInt(campaign.deadline));

            // Add campaign to campaigns
            state.campaigns.push({
                id: campaignId,
                musician: campaign.musician,
                title: campaign.title,
                description: campaign.description,
                url: campaign.url,
                goal: ethers.utils.formatEther(campaign.goal),
                raised: "0",
                deadline: deadlineDate.toLocaleString(),
                closed: false,
            })
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
                .findIndex(c => parseInt(c.id) === parseInt(campaignId));

            if (campaignIndex !== -1) {
                // Assuming the incoming amount is already in wei
                const newAmount = ethers.BigNumber.from(amount.toString());

                // Assuming existingAmount is stored in ether and converting it to wei for the calculation
                const existingAmount = ethers.utils.parseUnits(state.campaigns[campaignIndex].raised, 'ether');

                // BigNumber addition
                const updatedAmount = existingAmount.add(newAmount);

                // Update the campaign, converting the updated amount back to ether for consistency
                state.campaigns[campaignIndex].raised = ethers.utils.formatUnits(updatedAmount, 'ether');
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
            const { campaignId } = action.payload;

            // Update the campaign's closed status and decrement activeCampaignCount
            const campaign = state.campaigns.find(c => c.id === campaignId);
            if (campaign) {
                campaign.closed = true;
                state.activeCampaignCount -= 1;
            }
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