import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import Navbar from 'src/libraries/ui/Navbar'

interface Props {
    children: ReactNode
}

function NavbarLayout({ children }: Props) {
	const buildComponent = () => {
		return (
			<Flex
				direction='column'
				w='100%'
				h='100vh'
				overscrollBehavior='none'>
				<Navbar />
				<Flex
					className='body'
					zIndex={0}
					w='100%'
					overflowY='auto'
					overscrollBehavior='none'
					justifyContent='center'>
					{children}
				</Flex>
			</Flex>
		)
	}

	return buildComponent()
}

export default NavbarLayout