// useFundCampaign.js
import { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import { fundCampaign as fundCampaignAction } from '../../store/interactions';
import { selectMC, selectProvider, selectToken } from '../../store/selectors';

// Utils
import { tokens } from '../helpers';

const useFundCampaign = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const provider = useSelector(selectProvider);
    const mc = useSelector(selectMC);
    const token = useSelector(selectToken);

    const fundCampaign = async (campaignId, amount) => {
        setIsLoading(true);
        try {
            await fundCampaignAction(provider, mc, token, campaignId, tokens(amount), dispatch);
            setIsLoading(false);

            return true;
        } catch (error) {
            setError(error);
            setIsLoading(false);

            return false;
        }
    };

    return { fundCampaign, isLoading, error };
};

export default useFundCampaign;
