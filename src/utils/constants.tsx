import { MetamaskFox } from 'src/utils/assets/MetamaskFox'
import { WalletConnectLogo } from 'src/utils/assets/WalletConnectLogo'

import { AvailableWallet } from '@/screens/landing/_utils/types'

const availableWallets: AvailableWallet[] = [{
	name: 'Metamask',
	icon: <MetamaskFox
		h={8}
		w='33px' />,
	isPopular: true,
	id: 'injected',
}, {
	name: 'WalletConnect',
	icon: <WalletConnectLogo
		h={8}
		w='33px' />,
	isPopular: false,
	id: 'walletConnect'
}]

const CHAIN_INFO: {
	[key: number]: {
		REVIEWER_GUARD_FACTORY_CONTRACT: string
		WORKSPACE_REGISTRY: string
		APPLICATION_REGISTRY: string
		APPLICATION_REVIEW_REGISTRY: string
		safeTxServiceURL: string
	}
} = {
	5: {
		REVIEWER_GUARD_FACTORY_CONTRACT: '0x649E65F6EeC3365b5B1f99635311f2E0c274ABB1',
		WORKSPACE_REGISTRY: '0x4881fAB72dE0cBd58Bdc635EE9967d1de87EB5A2',
		APPLICATION_REGISTRY: '0x06c3C145F0879F969F2beb5d8DB1D25c83a7b7C2',
		APPLICATION_REVIEW_REGISTRY: '0xc782342D667f8355869E9f5D23f245804aB10F56',
		safeTxServiceURL: 'https://safe-transaction-goerli.safe.global/',
	},
	10: {
		REVIEWER_GUARD_FACTORY_CONTRACT: '0xfD7ae86a2182Fd80106C7da3a214441E170d547D',
		WORKSPACE_REGISTRY:' 0x2dB223158288B2299480aF577eDF30D5a533F137',
		APPLICATION_REGISTRY: '0xF4Db8BdDF1029764e4E09e7cE34149371a9A7027',
		APPLICATION_REVIEW_REGISTRY: '0xab163375C1aD08e24005771cC9908a1C7c61Adaa',
		safeTxServiceURL: 'https://safe-transaction-optimism.safe.global/',
	}
}

const defaultChainId = process.env.NODE_ENV === 'development' ? 5 : 10

export { availableWallets, CHAIN_INFO, defaultChainId }