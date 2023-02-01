import { useContext } from 'react'
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import AddressDisplay from 'src/libraries/ui/Navbar/AddressDisplay'
import ChainDisplay from 'src/libraries/ui/Navbar/ChainDisplay'
import { useAccount } from 'wagmi'

import { ConnectWalletContext } from '@/libraries/contexts/ConnectWalletContext'

function Navbar() {
	const buildComponent = () => (
		<Flex
			pos='sticky'
			left={0}
			top={0}
			right={0}
			zIndex={10}
			py='1rem'
			px='5rem'
			align='center'
			bg='gray.200'
		>
			<Image
				src='/logo.svg'
				cursor='pointer'
				onClick={
					() => {
						router.push({ pathname: '/' })
					}
				} />
			<Box ml='auto' />
			{isConnected && <ChainDisplay />}
			{isConnected && <AddressDisplay />}
			{
				!isConnected && (
					<Button
						color='white'
						bg='black'
						borderRadius={40}
						onClick={() => setIsModalOpen(true)}>
						{' '}
						Connect Wallet
						{' '}
					</Button>
				)
			}
		</Flex>
	)

	const router = useRouter()

	const { isConnected } = useAccount()
	const { setIsModalOpen } = useContext(ConnectWalletContext)!

	return buildComponent()
}

export default Navbar