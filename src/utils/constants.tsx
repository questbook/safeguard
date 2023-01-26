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

export { availableWallets }