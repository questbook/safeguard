import { createContext, ReactElement, useEffect, useState } from 'react'
import { ConnectWalletContextType } from 'src/libraries/types'
import { useAccount } from 'wagmi'

const ConnectWalletContext = createContext<ConnectWalletContextType | null>(null)

const ConnectWalletProvider = ({ children }: {children: ReactElement | ReactElement[]}) => {
	const context = () => {
		return (
			<ConnectWalletContext.Provider
				value={
					{
						isModalOpen,
						onModalClose: () => setIsModalOpen(false),
					}
				}>
				{children}
			</ConnectWalletContext.Provider>
		)
	}

	const { isConnected } = useAccount()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		if(isConnected) {
			setIsModalOpen(false)
		}
	}, [isConnected])

	return context()
}

export { ConnectWalletContext, ConnectWalletProvider }