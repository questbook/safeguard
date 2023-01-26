import { Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { formatAddress } from '@/libraries/utils/formatters'

function AddressDisplay() {
	const buildComponent = () => {
		return (
			<Text
				px='1rem'
				py='0.75rem'
				bg='white'>
				{formatAddress(address)}
			</Text>
		)
	}

	const { address } = useAccount()

	return buildComponent()
}

export default AddressDisplay