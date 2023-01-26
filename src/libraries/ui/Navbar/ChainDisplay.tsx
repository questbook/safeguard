import { Text } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

function ChainDisplay() {
	const buildComponent = () => {
		return (
			<Text
				px='1rem'
				py='0.75rem'
				bg='white'>
				{chain?.name}
			</Text>
		)
	}

	const { chain } = useNetwork()

	return buildComponent()
}

export default ChainDisplay