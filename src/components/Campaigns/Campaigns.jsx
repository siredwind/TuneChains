import React from "react";
import PropTypes from 'prop-types';

// Components
import Campaign from "../Campaign";

const Campaigns = ({ campaignsDetails }) => {
    return (
        <div className="flex flex-col items-center my-2">
            {campaignsDetails.map(campaign =>
                <Campaign campaign={campaign} key={campaign.id} />
            )}
        </div>
    )
}

Campaigns.propTypes = {
    campaignsDetails: PropTypes.array.isRequired,
};

export default Campaigns;