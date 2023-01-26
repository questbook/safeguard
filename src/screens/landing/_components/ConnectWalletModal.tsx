import React from 'react'
import {
	Divider, Flex, Image, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text,
} from '@chakra-ui/react'

import { availableWallets } from '@/utils/constants'

function ConnectWalletModal() {
	const buildComponent = () => (
		<Modal
			isOpen
			onClose={() => { }}
			size='xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<Flex
					p={6}
					direction='column'
					align='center'>
					<Image
						src='/qb.svg'
						boxSize='3rem'
						alt='' />
					<Divider
						mt='2rem'
						bg='gray.100' />

					<Text
						mt='2rem'
						variant='h3'
						fontWeight='700'>
						Connect Wallet
					</Text>

					<Text
						mt='0.25rem'
						color='gray.500'
						textAlign='center'>
						To start using Safeguard, connect with one of your wallets.
					</Text>

					{
						availableWallets.map((wallet, index) => (
							<Flex
								align='center'
								key={wallet.id}
								mt={index === 0 ? '1.5rem' : '1rem'}
								p='2rem'
								bg='gray.200'
								h='5rem'
								w='27rem'
								justifyContent='flex-start'>
								{wallet.icon}
								<Text
									ml='1rem'
									fontWeight='500'>
									{wallet.name}
								</Text>
								<Text
									ml='auto'
									fontWeight='500'
									color='blue.100'>
									Connect
								</Text>
							</Flex>
						))
					}
				</Flex>
			</ModalContent>
		</Modal>
	)

	return buildComponent()
}

export default ConnectWalletModal
