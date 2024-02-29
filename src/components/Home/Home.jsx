import React from "react";

// Components
import BlockSpinner from "../common/Effects/BlockSpinner/BlockSpinner";
import Container from "../Container";
import Campaign from "../Campaign";
import FadeIn from "../common/Effects/FadeIn/FadeIn";
import News from "../News";

// Redux 
import { useSelector } from "react-redux";

// Store
import {
  campaignSelector,
  selectActiveCampaignCount
} from "../../store/selectors";

const Home = () => {
  const activeCampaignsCount = useSelector(selectActiveCampaignCount);
  const campaignsDetails = useSelector(campaignSelector);

  return (
    <Container id="home">

      <FadeIn>
        <News activeCampaigns={parseInt(activeCampaignsCount)} />

        <div className="flex flex-col items-center my-2">
          {campaignsDetails
            ? campaignsDetails.map(campaign =>
              <Campaign
                campaign={campaign}
                key={campaign.id}
              />)
            : <div className="flex flex-col bg-[#131315] w-100 h-32 px-12 py-10 rounded-3xl my-2 text-white justify-center items-center">
              <BlockSpinner size={32} />
            </div>}
        </div>
      </FadeIn>
    </Container>
  );
}

export default Home;
