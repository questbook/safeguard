import { createContext, ReactElement, useState } from 'react'
import { ConnectWalletContextType } from 'src/libraries/types'

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

	const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

	return context()
}

export { ConnectWalletContext, ConnectWalletProvider }