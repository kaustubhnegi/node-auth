// import { Web3AuthCore } from "@web3auth/core";
// import { CHAIN_NAMESPACES } from "@web3auth/base";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const Web3AuthCore = require('@web3auth/core');
const CHAIN_NAMESPACES = require('@web3auth/base')
const OpenloginAdapter = require    ('@web3auth/openlogin-adapter')



const web3authCore = new Web3AuthCore({
	chainConfig: { // this is ethereum chain config, change if other chain(Solana, Polygon)
		chainNamespace: CHAIN_NAMESPACES.EIP155,
		chainId: "0x1",
		rpcTarget: "https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c",
		blockExplorer: "https://etherscan.io/",
		ticker: "ETH",
		tickerName: "Ethereum"
	},  
});
const adapter = new OpenloginAdapter({ adapterSettings: {
	network: "testnet",
	clientId: "Your clientId from Plug n play section",
	uxMode: "redirect", // other option: popup
	loginConfig: {
		google: {
			name: "any name",
			verifier: "testIdentifier",
			typeOfLogin: "google",
			clientId: "422455732869-q4ktcbcsihcqlg01fj886ispch9thoj1.apps.googleusercontent.com",

		},
	},
}});
web3authCore.configureAdapter(adapter);
await web3authCore.init();

// call below code when user clicks on login button
// it will use google login with openlogin's authentication
await web3authCore.connectTo(adapter.name, {loginProvider: "google"});