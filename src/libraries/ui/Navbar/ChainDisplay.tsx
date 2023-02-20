import { Text, Tooltip } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

import { CHAIN_INFO } from '@/utils/constants'

function ChainDisplay() {
	const buildComponent = () => {
		return (
			<Tooltip label={(chain?.id && (chain?.id in CHAIN_INFO)) ? '' : 'We only support Optimism Mainet'}>
				<Text
					px='1rem'
					py='0.75rem'
					bg='white'>
					{(chain?.id && (chain?.id in CHAIN_INFO)) ? chain?.name : 'Unsupported network'}
				</Text>
			</Tooltip>
		)
	}

	const { chain } = useNetwork()

	return buildComponent()
}

export default ChainDisplay