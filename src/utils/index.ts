import { ethers } from 'ethers'

export const isValidEthereumAddress = (address: string) => {
	return ethers.utils.isAddress(address)
}