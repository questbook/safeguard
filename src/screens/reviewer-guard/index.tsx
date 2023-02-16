/* eslint-disable no-console */
import { ReactElement, useState } from 'react'
import { Button, Circle, Flex, IconButton, Input, Progress, Text } from '@chakra-ui/react'
import Safe from '@safe-global/safe-core-sdk'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import SafeServiceClient from '@safe-global/safe-service-client'
import { ethers } from 'ethers'
import ReviewerDeployer from 'src/abis/ReviewerDeployer.json'
import { APPLICATION_REGISTRY, APPLICATION_REVIEW_REGISTRY, REVIEWER_GUARD_FACTORY_CONTRACT, WORKSPACE_REGISTRY } from 'src/utils/constants'
import { useAccount, useContract, useSigner } from 'wagmi'

import { Add, Close } from '@/generated/icons'
import NavbarLayout from '@/libraries/ui/NavbarLayout'
import { isValidEthereumAddress } from '@/utils'

function ReviewerGuard() {
	const buildComponent = () => {
		return (
			<Flex
				w='100%'>
				<Flex
					zIndex={-1}
					position='absolute'
					left={0}
					right={0}
					top={0}
					bg='gray.200'
					h='50%' />
				<Flex
					zIndex={-1}
					position='absolute'
					left={0}
					right={0}
					bottom={0}
					bg='black.100'
					h='50%' />
				<Flex
					w='100%'
					direction='column'
					bg='white'
					mx='4rem'
					my='1rem'
					borderRadius='0.5rem'
					boxShadow='0px 2px 8px rgba(29, 25, 25, 0.1)'>
					<Flex
						w='100%'
						justify='space-between'>
						{
							steps.map((_, index) => (
								<Progress
									borderTopLeftRadius={index === 0 ? '0.5rem' : 0}
									borderTopRightRadius={index === steps.length - 1 ? '0.5rem' : 0}
									w='33%'
									key={index}
									value={index <= currentStep ? 100 : 0}
									colorScheme='green'
									h='0.5rem' />
							))
						}
					</Flex>
					<Flex
						direction='column'
						h='max-content'
						overflowY='auto'>
						{
							steps.map((step, index) => {
								if(index === currentStep) {
									return (
										<Flex
											key={index}
											borderBottom='1px solid #CEC9BD'
											px='3rem'
											py='2rem'
											bg='white'>
											{step.item()}
										</Flex>
									)
								} else {
									return (
										<Flex
											key={index}
											borderBottom='1px solid #CEC9BD'
											px='3rem'
											py='2rem'
											bg='white'
											cursor={index < currentStep ? 'pointer' : 'default'}
											onClick={
												() => {
													if(index < currentStep) {
														setCurrentStep(index)
													}
												}
											}
											align='center'>
											{numberWithCircle(index + 1)}
											<Text
												fontWeight='700'
												ml='2rem'>
												{step.title}
											</Text>
											{
												index < currentStep && (
													<Text
														color='gray.500'
														ml='1rem'>
														{index === 0 ? safeAddress : index === 1 ? reviewers.length : ''}
													</Text>
												)
											}
										</Flex>
									)
								}
							})
						}
					</Flex>

					<Flex
						mt='auto'
						justify='end'
						px='4rem'
						py='1rem'>
						<Button
							variant='primary'
							isLoading={isDeploying}
							isDisabled={currentStep < 2}
							onClick={setGuard}>
							Set Guard
						</Button>
					</Flex>
				</Flex>
			</Flex>
		)
	}

	const numberWithCircle = (num: number) => {
		return (
			<Circle
				size='2rem'
				bg='black.100'
			>
				<Text
					variant='body'
					fontWeight='700'
					color='white'>
					{num}
				</Text>
			</Circle>
		)
	}

	const safeAddressStep = () => {
		return (
			<Flex direction='column'>
				<Text
					variant='h2'
					fontWeight='700'>
					Set Reviewer Guard
				</Text>
				<Text mt='0.25rem'>
					Set a guard which initiates payouts based on proposal reviews
				</Text>
				<Flex mt='2rem'>
					{numberWithCircle(1)}
					<Flex
						direction='column'
						ml='2rem'>
						<Text
							color='green.500'
							fontWeight='700'>
							SAFE ADDRESS
						</Text>
						<Text mt='0.5rem'>
							Enter the address of the safe you want to set the reviewer guard on
						</Text>
						<Input
							mt='2.5rem'
							placeholder='Enter safe address'
							value={safeAddress}
							onChange={
								(e) => {
									setSafeAddress(e.target.value)
								}
							} />
						<Flex
							mt='1rem'
							justify='end'>
							<Button
								bg='black.100'
								variant='primary'
								isDisabled={safeAddress === '' || !isValidEthereumAddress(safeAddress)}
								onClick={
									() => {
										setCurrentStep(1)
									}
								}>
								Next
							</Button>
						</Flex>

					</Flex>
				</Flex>
			</Flex>
		)
	}

	const setReviewersStep = () => {
		return (
			<Flex
				mt='2rem'
				w='70%'>
				{numberWithCircle(2)}
				<Flex
					direction='column'
					w='100%'
					ml='2rem'>
					<Text
						color='green.500'
						fontWeight='700'>
						SET REVIEWERS
					</Text>
					<Text mt='0.5rem'>
						Enter the name and address of the reviewers you want to add to your guard
					</Text>

					{
						reviewers.map((reviewer, index) => {
							return (
								<Flex
									w='100%'
									key={index}
									mt='2.5rem'
									gap='1rem'
									align='start'
									justify='space-between'>
									<Input
										variant='flushed'
										flex={1}
										placeholder='Name'
										borderBottom='1px solid #CEC9BD'
										value={reviewer.name}
										onChange={
											(e) => {
												const copy = [...reviewers]
												copy[index].name = e.target.value
												setReviewers(copy)
											}
										} />
									<Input
										variant='flushed'
										flex={2}
										placeholder='Wallet Address'
										borderBottom='1px solid #CEC9BD'
										value={reviewer.address}
										onChange={
											(e) => {
												const copy = [...reviewers]
												copy[index].address = e.target.value
												setReviewers(copy)
											}
										}	 />
									<IconButton
										ml='0.5rem'
										aria-label={`remove-${index}`}
										isDisabled={reviewers.length === 1}
										variant='ghost'
										onClick={
											() => {
												const copy = [...reviewers]
												copy.splice(index, 1)
												setReviewers(copy)
											}
										}
										icon={<Close boxSize='1.25rem' />} />
								</Flex>
							)
						})
					}

					<Flex
						mt='2.5rem'
						justify='space-between'>
						<Button
							variant='link'
							leftIcon={<Add color='black.100' />}
							onClick={
								() => {
									setReviewers([...reviewers, { name: '', address: '' }])
								}
							}>
							<Text fontWeight='500'>
								Add Another
							</Text>

						</Button>
						<Button
							bg='black.100'
							variant='primary'
							isDisabled={reviewers.length === 0 || reviewers.some((reviewer) => reviewer.name === '' || reviewer.address === '' || !isValidEthereumAddress(reviewer.address))}
							onClick={
								() => {
									setCurrentStep(2)
								}
							}>
							Next
						</Button>
					</Flex>

				</Flex>
			</Flex>
		)
	}

	const setNumberOfReviewsRequiredStep = () => {
		return (
			<Flex
				mt='2rem'
				w='50%'>
				{numberWithCircle(3)}
				<Flex
					direction='column'
					ml='2rem'
					w='100%'>
					<Text
						color='green.500'
						fontWeight='700'>
						NUMBER OF REVIEWS
					</Text>
					<Text mt='0.5rem'>
						How many reviewers should review?
					</Text>

					<Flex
						align='flex-end'
						mt='2.5rem'>
						<Input
							variant='flushed'
							w='3ch'
							placeholder={reviewers.length.toString()}
							borderBottom='1px solid #CEC9BD'
							type='number'
							value={numOfReviewers ?? ''}
							textAlign='center'
							onChange={
								(e) => {
									const val = parseInt(e.target.value)
									if(val < 1 || val > reviewers.length) {
										return
									}

									setNumOfReviewers(val)
								}
							} />
						<Text
							variant='body'
							ml='1rem'
							color='gray.500'>
							out of
							{' '}
							{reviewers.length}
							{' '}
							reviewers
						</Text>
					</Flex>


				</Flex>
			</Flex>
		)
	}

	const steps = [{ title: 'Safe address', item: safeAddressStep }, { title: 'Set reviewers', item: setReviewersStep }, { title: 'Set number of reviews required', item: setNumberOfReviewsRequiredStep }]

	const [safeAddress, setSafeAddress] = useState<string>('')
	const [reviewers, setReviewers] = useState<{name: string, address: string}[]>([{ name: '', address: '' }])
	const [numOfReviewers, setNumOfReviewers] = useState<number>()

	const [currentStep, setCurrentStep] = useState<number>(0)
	const [isDeploying, setIsDeploying] = useState<boolean>(false)

	const { address } = useAccount()

	const reviewerAddresses: string[] = []

	const { data: signer } = useSigner({
		chainId: 5,
	})

	const factoryContract = useContract({
		address: REVIEWER_GUARD_FACTORY_CONTRACT,
		abi: ReviewerDeployer.abi,
		signerOrProvider: signer
	})

	const setGuard = async() => {
		for(const reviewer of reviewers) {
			reviewerAddresses.push(reviewer.address)

			if(reviewer.name === '' || reviewer.address === '') {
				return
			}
		}

		if(!signer || !address || !safeAddress) {
			return
		}

		console.log(address)
		console.log(reviewerAddresses)
		console.log(numOfReviewers)

		if(!factoryContract) {
			return
		}

		setIsDeploying(true)

		const txn = await factoryContract.deploy(safeAddress, reviewerAddresses, numOfReviewers, APPLICATION_REGISTRY, APPLICATION_REVIEW_REGISTRY, WORKSPACE_REGISTRY)
		await txn.wait()
		console.log('Txn: ' + txn)

		let guardAddress = ''

		const provider = await ethers.getDefaultProvider('goerli', { alchemy: process.env.QB_ALCHEMY_KEY })
		console.log(process.env.QB_ALCHEMY_KEY)
		console.log('provider', provider)

		const tx = await provider.getTransactionReceipt(txn.hash)
		console.log('txn hash', txn.hash)
		console.log('tx: ' + tx)

		const iface = new ethers.utils.Interface(ReviewerDeployer.abi)
		console.log(tx)

		try {
			for(const log of tx.logs) {
				const event = iface.parseLog(log)
				if(event.name === 'GuardDeployed') {
					console.log('Event: ' + event)
					guardAddress = event.args[0]
					console.log(guardAddress)
				}
			}
		} catch(e) {
			console.log('Error')
		}

		// while (true) {
		//     const counter = await factoryContract.counter()
		//     if (counter > prevCounter) {
		// 		console.log(counter);
		//         break;
		//     }
		// }

		const ethAdapter = new EthersAdapter({
			ethers,
			signerOrProvider: signer,
		})

		const service = new SafeServiceClient({
			txServiceUrl: 'https://safe-transaction-goerli.safe.global/', // Check https://docs.safe.global/backend/available-services
			ethAdapter
		})

		const safeSdk = await Safe.create({ ethAdapter, safeAddress })
		console.log(await safeSdk.getGuard())
		const safeRet = await safeSdk.createEnableGuardTx(guardAddress)
		const safeTxHash = await safeSdk.getTransactionHash(safeRet)
		const senderAddress = await signer.getAddress()
		const signature = await safeSdk.signTransactionHash(safeTxHash)

		console.log('Proposed a transaction with Safe:', safeAddress)
		console.log('- safeTxHash:', safeTxHash)
		console.log('- senderAddress:', senderAddress)
		console.log('- Sender signature:', signature.data)

		await service.proposeTransaction({
			safeAddress,
			safeTransactionData: safeRet.data,
			safeTxHash,
			senderAddress,
			senderSignature: signature.data
		})

		console.log(safeRet)
		setIsDeploying(false)
	}

	return buildComponent()
}

ReviewerGuard.getLayout = function(page: ReactElement) {
	return (
		<NavbarLayout>
			{page}
		</NavbarLayout>
	)
}


export default ReviewerGuard