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
						setIsModalOpen,
					}
				}>
				{children}
			</ConnectWalletContext.Provider>
		)
	}

	// const { address } = useAccount()
	const { isConnected } = useAccount()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		if(isConnected) {
			setIsModalOpen(false)
		}
	}, [isConnected])

	// useEffect(() => {
	// 	if(address) {
	// 		const deployedGuardsString = localStorage.getItem('deployedGuards')
	// 		if(!deployedGuardsString) {
	// 			const map: {[key: string]: unknown} = {}
	// 			map[address] = {}
	// 			localStorage.setItem('deployedGuards', JSON.stringify(map))
	// 		} else if(!JSON.parse(deployedGuardsString)[address]) {
	// 			const json = JSON.parse(deployedGuardsString)
	// 			json[address] = {}
	// 			localStorage.setItem('deployedGuards', JSON.stringify(json))
	// 		}
	// 	}
	// }, [address])

	return context()
}

export { ConnectWalletContext, ConnectWalletProvider }