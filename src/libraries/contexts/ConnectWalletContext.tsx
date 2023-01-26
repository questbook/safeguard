import { createContext, useState } from 'react'
import { ConnectWalletContextType } from 'src/libraries/types'

const ConnectWalletContext = createContext<ConnectWalletContextType | null>(null)

const ConnectWalletProvider = ({ children }: any) => {
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

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return context()
}

export { ConnectWalletContext, ConnectWalletProvider }