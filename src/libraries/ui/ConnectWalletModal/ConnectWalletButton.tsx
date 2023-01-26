import { useState } from 'react'
import { Box, Button, Fade, Flex, Text } from '@chakra-ui/react'
import { AvailableWallet } from 'src/screens/landing/_utils/types'

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
				p='2rem'
				h='5rem'
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
						rightIcon={<ArrowRight color='black' />}>
						Connect
					</Button>
				</Fade>
			</Flex>
		)
	}

	const [isHovered, setIsHovered] = useState<boolean>(false)

	return buildComponent()
}

export default ConnectWalletButton