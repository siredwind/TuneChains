<div align="center">
  <img src="https://imgur.com/gallery/3ICInCu" />
  <h3>
    TuneChains Repository
  </h3>
</div>

⚡️ Web3 application with Bento Grids styling that is allowing musicians to create campaigns to promote their creations and raise funds from fans.

Built using **Solidity**, **ReactJS*, **RainbowKit**, **Wagmi**, **Redux**, **Ethers**.

## 🔑 Bento Grid
Bento Grid is the new design trend which is composed from modular boxes and it is useful to showcase multiple items in a single space. Apple is known for using this incredible design to create their presentation websites. 

👉 React template: https://github.com/saipranay47/bento-grid-portfolio

👉 Learn more about Bento Grid designs: https://bentogrids.com

![TuneChains Example](https://imgur.com/gallery/mLZdcpN)

##

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/TABASCOatw/particle-rainbowkit-boilerplate&env=REACT_APP_PROJECT_ID&env=REACT_APP_CLIENT_KEY&env=REACT_APP_APP_ID&env=REACT_APP_WALLETCONNECT_PROJECT_ID&envDescription=Head%20over%20to%20the%20Particle%20dashboard%20to%20retrieve%20the%20above%20keys.&envLink=https%3A%2F%2Fdashboard.particle.network">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
</p>

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/siredwind/TuneChains.git
```

### Install dependencies
```
npm install
```

### Set environment variables
This project requires a number of keys from Pinata to be defined in `.env`. The following should be defined:
- `REACT_APP_PINATA_JWT`, the corresponding Pinata JWT from your account at [Pinata Cloud](https://app.pinata.cloud/developers/api-keys).
- `REACT_APP_PINATA_GATEWAY`, the Pinata gateway to ipfs: [Pinata Gateway](https://gateway.pinata.cloud/ipfs).

### Start the project
```
npm run start
```

### Start the node locally
```
npx hardhat node
```

### Deploy smart contracts
```
npx hardhat run scripts/deploy.js --network localhost
```

### Run seed script for creating 5 standard campaigns 
```
npx hardhat run scripts/seed.js --network localhost
```