import React from "react";

// Components
import Container from "../Container";
import Campaigns from "../Campaigns";
import FadeIn from "../common/Effects/FadeIn";
import LoadingDialog from "../LoadingDialog";
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

        {campaignsDetails
          ? <Campaigns campaignsDetails={campaignsDetails} />
          : <LoadingDialog text={"Loading data"} />
        }

      </FadeIn>
    </Container>
  );
}

export default Home;
