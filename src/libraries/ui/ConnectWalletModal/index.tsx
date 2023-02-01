import React, { useContext } from 'react'
import {
	Box,
	Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text,
} from '@chakra-ui/react'

import { ConnectWalletContext } from '@/libraries/contexts/ConnectWalletContext'
import ConnectWalletButton from '@/libraries/ui/ConnectWalletModal/ConnectWalletButton'
import { availableWallets } from '@/utils/constants'

function ConnectWalletModal() {
	const buildComponent = () => (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			isCentered
			size='xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<Flex
					p={6}
					direction='column'
				>

					<Text
						mt='1rem'
						variant='h2'
						fontWeight='700'>
						Connect Wallet
					</Text>

					<Text
						mt='0.25rem'
						color='black.100'>
						To start using Safeguard, connect with one of your wallets.
					</Text>

					<Box mt='1.5rem' />

					{
						availableWallets.map((wallet, index) => (
							<ConnectWalletButton
								key={wallet.id}
								wallet={wallet}
								index={index} />
						))
					}
				</Flex>
			</ModalContent>
		</Modal>
	)

	const { isModalOpen, setIsModalOpen } = useContext(ConnectWalletContext)!

	return buildComponent()
}

export default ConnectWalletModal
