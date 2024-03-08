import React, { useMemo } from "react";
import PropTypes from 'prop-types';

// Components
import LoadingDialog from "../LoadingDialog";

// Images
import MusicCampaignIcon from "../../assets/music-campaign.png";
import CommentIcon from "../../assets/comment.png";
import EtherIcon from "../../assets/ether.png";

// Hooks
import useFetchVideoUrl from "../../utils/hooks/useFetchVideoUrl";
import useCloseCampaign from "../../utils/hooks/useCloseCampaign";

const CampaignDetails = ({ campaign, handleClick = () => { } }) => {
    const { closeCampaign, isLoading } = useCloseCampaign();

    const fundsRaisedPercentage = useMemo(() => {
        const currentPercentage = parseInt(campaign.raised) / parseInt(campaign.goal) * 100;
        const fixedPercentage = parseFloat(currentPercentage.toFixed(2));
        if (fixedPercentage > 100)
            return 100;
        else return fixedPercentage;
    }, [campaign.raised, campaign.goal]);

    const { videoUrl } = useFetchVideoUrl(campaign);

    const handleCloseCampaign = async () => {
        // Close Campaign
        await closeCampaign(campaign.id);
    };

    return (
        <div className="flex flex-col w-3/4 bg-[#131315] px-12 py-10 rounded-3xl my-2">
            {
                <video
                    src={videoUrl}
                    alt={MusicCampaignIcon}
                    className="w-full rounded-xl"
                    style={{ backgroundColor: 'transparent' }}
                    controls
                />
            }

            <h2 className="text-white text-xl font-bold text-left m-2">{campaign.title}</h2>

            <h5 className="flex items-center text-sm text-left">
                <img src={CommentIcon} alt="Comment" style={{ filter: 'brightness(0) invert(1)', width: "20px", height: "20px" }} />
                <span className="flex items-center ml-8 bg-[#000000] py-1 px-4 rounded-3xl" style={{ marginLeft: '8px' }}>
                    {campaign.description}
                </span>
            </h5>

            <div className="flex items-center justify-center text-white mt-4">
                {fundsRaisedPercentage === 100
                    ? <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mx-2" onClick={handleCloseCampaign}>
                        Close
                    </button>
                    : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={handleClick}>
                        Fund
                    </button>
                }

                <div className={`flex items-center justify-center py-1 px-4 rounded-3xl mx-2 ${fundsRaisedPercentage === 100 ? 'bg-green-800' : 'bg-[#000000]'}`}>
                    <img src={EtherIcon} alt="Raised" style={{ filter: 'brightness(0) invert(1)', width: "30px", height: "30px" }} />
                    <span className="text-sm">
                        {campaign.raised} DAPP Raised ({fundsRaisedPercentage}%)
                    </span>
                </div>
                <div className="flex items-center justify-center bg-[#000000] py-2 px-4 rounded-3xl mx-2">
                    <span className="text-sm">
                        Active Until {campaign.deadline}
                    </span>
                </div>
            </div>

            {isLoading && <LoadingDialog text={"Closing campaign"} />}
        </div>
    )
}

CampaignDetails.propTypes = {
    campaign: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default CampaignDetails;