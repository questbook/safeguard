import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

import { ConnectWalletProvider } from '@/libraries/contexts/ConnectWalletContext'
import ConnectWalletModal from '@/libraries/ui/ConnectWalletModal'
import theme from '@/themes'

export default function App({ Component, pageProps }: AppProps) {
	const buildComponent = () => {
		return (
			<ChakraProvider theme={theme}>
				<ConnectWalletProvider>
					<Component {...pageProps} />
					<ConnectWalletModal />
				</ConnectWalletProvider>
			</ChakraProvider>
		)
	}

	return buildComponent()
}
