import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAccount, useNetwork } from 'wagmi';

// Components
import CreateCampaign from './components/CreateCampaign';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import WelcomeDialog from './components/WelcomeDialog';

// Store Actions
import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadToken,
  loadMC,
  loadCampaigns,
} from "./store/interactions";

const App = () => {
  const dispatch = useDispatch();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      setOpenDialog(true);
      if (isConnected && chain?.id !== 1) {
        const provider = loadProvider(dispatch);
        const chainId = await loadNetwork(provider, dispatch);

        if (typeof window.ethereum !== 'undefined') {
          window.ethereum.on('chainChanged', () => window.location.reload());
          window.ethereum.on('accountsChanged', async () => await loadAccount(dispatch));
        }

        if (chainId) {
          await loadToken(provider, chainId, dispatch);
          const mc = await loadMC(provider, chainId, dispatch);
          await loadCampaigns(mc, dispatch);
        }
      }
    };

    loadBlockchainData();

    // Cleanup function to remove listeners
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('chainChanged', () => window.location.reload());
        window.ethereum.removeListener('accountsChanged', async () => await loadAccount(dispatch));
      }
    };
  }, [isConnected, chain?.id, dispatch]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <HashRouter>
      <Navigation show={isConnected && chain?.id !== 1} />

      {isConnected && openDialog && <WelcomeDialog onClick={handleClose} />}

      <Routes>
        {isConnected && chain?.id !== 1 ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
          </>
        ) : (
          <Route path="*" element={<LandingPage />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
