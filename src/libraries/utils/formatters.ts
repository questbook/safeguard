function formatAddress(address: string | undefined, size = 4) {
	return address && address.length > size ? `${address.slice(0, size)}...${address.slice(-size)}` : ''
}

export { formatAddress }