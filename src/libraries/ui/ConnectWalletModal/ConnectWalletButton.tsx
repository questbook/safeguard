import { useState } from 'react'
import { Box, Button, Fade, Flex, Text } from '@chakra-ui/react'
import { AvailableWallet } from 'src/screens/landing/_utils/types'
import { useConnect } from 'wagmi'

import { ArrowRight } from '@/generated/icons'

interface Props {
    wallet: AvailableWallet
    index: number
}

function ConnectWalletButton({ wallet }: Props) {
	const buildComponent = () => {
		return (
			<Flex
				align='center'
				p='1rem'
				justifyContent='flex-start'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Flex
					bg='white'
					border='0.1px solid #787666'
					p='0.75rem'>
					{wallet.icon}
				</Flex>
				<Text
					ml='1rem'
					fontWeight='700'>
					{wallet.name}
				</Text>

				<Box ml='auto' />

				<Fade in={isHovered} >
					<Button
						bg='gray.200'
						borderRadius='0.5rem'
						rightIcon={<ArrowRight color='black' />}
						onClick={
							async() => {
								const connector = connectors.find((x) => x.id === wallet.id)!
								// swallow error here so we don't fail the remaining logic
								const isConnected = await connector.isAuthorized().catch(() => false)

								if(!isConnected) {
									try {
										await connectAsync({ connector })
									} catch(e) {
										// console.log('evm error', e)
									}
								}
							}
						}>
						Connect
					</Button>
				</Fade>
			</Flex>
		)
	}

	const [isHovered, setIsHovered] = useState<boolean>(false)
	const {
		connectAsync,
		connectors,
	} = useConnect()

	return buildComponent()
}

export default ConnectWalletButton