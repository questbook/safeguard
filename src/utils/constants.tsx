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

const REVIEWER_GUARD_FACTORY_CONTRACT = '0xD36a993bd3F7cA645Fd3F46b7aA0Fc8084507888'
const WORKSPACE_REGISTRY = '0x4881fAB72dE0cBd58Bdc635EE9967d1de87EB5A2'
const APPLICATION_REGISTRY = '0x06c3C145F0879F969F2beb5d8DB1D25c83a7b7C2'
const APPLICATION_REVIEW_REGISTRY = '0xc782342D667f8355869E9f5D23f245804aB10F56'

export { availableWallets, REVIEWER_GUARD_FACTORY_CONTRACT, WORKSPACE_REGISTRY, APPLICATION_REGISTRY, APPLICATION_REVIEW_REGISTRY }