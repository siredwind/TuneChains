import { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import { closeCampaign as closeCampaignAction } from '../../store/interactions';
import { selectMC, selectProvider } from '../../store/selectors';

const useCloseCampaign = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const provider = useSelector(selectProvider);
    const mc = useSelector(selectMC);

    const closeCampaign = async (campaignId) => {
        setIsLoading(true);
        try {
            await closeCampaignAction(
                provider,
                mc,
                campaignId,
                dispatch
            );
            setIsLoading(false);

            return true;
        } catch (error) {
            setError(error);
            setIsLoading(false);

            return false;
        }
    };

    return { closeCampaign, isLoading, error };
};

export default useCloseCampaign;
