import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

import theme from '@/themes'

export default function App({ Component, pageProps }: AppProps) {
	const buildComponent = () => {
		return (
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		)
	}

	return buildComponent()
}
