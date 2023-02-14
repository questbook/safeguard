import { ReactElement, useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
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

type NextPageWithLayout = NextPage & {
	getLayout: (page: ReactElement) => ReactElement
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
};

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
		new InjectedConnector({ chains, options: { shimDisconnect: true, shimChainChangedDisconnect: false } }),
		new WalletConnectConnector({
		  chains,
		  options: {
				qrcode: true,
		  },
		}),
	  ],
	  provider,
})

function App({ Component, pageProps }: AppPropsWithLayout) {
	const buildComponent = () => {
		return (
			<WagmiConfig client={client}>
				<ChakraProvider theme={theme}>
					<ConnectWalletProvider>
						{getLayout?.(<Component {...pageProps} />)}
						<ConnectWalletModal />
					</ConnectWalletProvider>
				</ChakraProvider>
			</WagmiConfig>
		)
	}

	const getLayout = Component.getLayout || ((page) => page)

	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	return hasMounted ? buildComponent() : null
}

export default App
