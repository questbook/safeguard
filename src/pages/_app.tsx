import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, optimism, polygon } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import '@/styles/globals.css'

import { ConnectWalletProvider } from '@/libraries/contexts/ConnectWalletContext'
import ConnectWalletModal from '@/libraries/ui/ConnectWalletModal'
import theme from '@/themes'

const celo: Chain = {
	id: 42220,
	name: 'Celo Mainnet',
	network: 'celo',
	nativeCurrency: {
		name: 'celo',
		symbol: 'CELO',
		decimals: 18,
	},
	rpcUrls: { public: { http: ['https://forno.celo.org'] }, default: { http: ['https://forno.celo.org'] } }
}

const { chains, provider } = configureChains([goerli, optimism, polygon, celo], [
	publicProvider(),
	infuraProvider({ apiKey: process.env.INFURA_KEY! }),
	alchemyProvider({ apiKey: process.env.ALCHEMY_KEY! })
])

const client = createClient({
	autoConnect: true,
	connectors: [
		new InjectedConnector({ chains }),
		new WalletConnectConnector({
		  chains,
		  options: {
				qrcode: true,
		  },
		}),
	  ],
	  provider,
})

export default function App({ Component, pageProps }: AppProps) {
	const buildComponent = () => {
		return (
			<WagmiConfig client={client}>
				<ChakraProvider theme={theme}>
					<ConnectWalletProvider>
						<Component {...pageProps} />
						<ConnectWalletModal />
					</ConnectWalletProvider>
				</ChakraProvider>
			</WagmiConfig>
		)
	}

	return buildComponent()
}
