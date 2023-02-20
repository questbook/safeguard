import { ReactElement } from 'react'
import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	HStack,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount, useNetwork } from 'wagmi'

import NavbarLayout from '@/libraries/ui/NavbarLayout'
import { ButtonComponent } from '@/screens/landing/_components/ButtonComponent'
import { QuestbookLogo } from '@/utils/assets/QuestbookLogo'
// import { GuardIcon } from "@/utils/assets/GuardIcon";

function Home() {
	const buildComponent = () => (
		<Flex
			direction='column'
			w='100%'
			bg='gray.200'
			p={0}>
			<Flex
				mt='1rem'
				justify='space-between'
				align='center'
				px='5rem'>
				<Flex
					direction='column'
					maxW='45%'
				>
					<Text
						variant='h1'
						textColor='green.500'
						fontSize='60px'
						lineHeight='72px'
						fontWeight='700'
					>
						Financial Guards for your Safe
					</Text>
					<Text
						mt='0.75rem'
						fontSize='32px'
						lineHeight='40px'>
						Your on-chain financial controllers for Gnosis Safes
					</Text>
				</Flex>
				<Image
					boxSize='40rem'
					zIndex={1}
					src='/guard-icon.svg'
				 />
			</Flex>
			<Flex
				w='full'
				p='1.25rem'
				bg='black.100'
				justify='space-between'
				direction='column'
				py='4rem'
			>
				<Flex
					direction='column'>
					<Flex
						align='end'
						justify='center'
						gap='0.5rem'>
						<Text
							as='span'
							variant='h1'
							color='white'
							fontSize='3rem'
							fontWeight='700'
							letterSpacing='wide'
						>
							Own Your Safe. Own your
							{' '}
						</Text>
						<Text
							as='span'
							variant='h1'
							fontSize='3rem'
							fontWeight='700'
							color='green.500'
						>
							Guard.
						</Text>
					</Flex>

					<Flex
						align='end'
						justify='center'
						mt='0.5rem'
						gap='0.5rem'>
						<Text
							as='span'
							color='white'
							textAlign='center'
							mb='0.125rem'
						>
							{' '}
							Here&apos;s a list of guards on SafeGuard. We will add more as we go.
							{' '}
						</Text>
						<Button
							as='span'
							justifyContent='end'
							color='green.500'
							variant='link'
							rightIcon={<Image src='Arrow-right-green.svg' />}
						>
							Request a Guard
						</Button>
					</Flex>

				</Flex>
				<Grid
					templateColumns='repeat(5, 1fr)'
					gridTemplateRows='repeat(2, 1fr)'
					mx='9rem'
					gap='1rem'
					mt='4rem'>
					{
						guards.map((guard, index) => {
							const isActive = address !== undefined && chain !== undefined ? localStorage.getItem(`${guard.type}-${address}-${chain.id}`) !== undefined : false
							return (
								<GridItem
									key={index}
									colSpan={ Math.floor(index / 2) % 2 === 0 ? (index % 2 === 0 ? 3 : 2) : (index % 2 === 0 ? 2 : 3)}>
									<Flex
										p='2rem'
										bg={isActive ? 'white' : 'gray.200'}
										direction='column'
										borderRadius='0.5rem'
										align='start'
										h='25rem'
									>
										<Text
											fontWeight='700'
											color={isActive ? 'green.500' : 'black.300'}>
											{isActive ? 'INSTALLED' : 'COMING SOON'}
										</Text>
										<Flex
											w='100%'
											justify='space-between'
											align='start'
											h={isActive ? 'auto' : '100%'}
										>
											<Flex
												direction='column'
												justify='end'
												h='100%'>
												<Text
													variant='h2'
													fontWeight='700'>
													{guard.title.substring(0, guard.title.lastIndexOf(' '))}
												</Text>
												<Text
													mt='0.25rem'
													variant='h2'
													fontWeight='700'>
													{guard.title.substring(guard.title.lastIndexOf(' ') + 1)}
												</Text>
												{
													!isActive && (
														<Text mt='1rem'>
															{guard.description}
														</Text>
													)
												}
												{
													isActive && (
														<Button
															mt='1rem'
															variant='primary'
															onClick={() => guard.onMoreClick(isActive)}>
															Edit Guard
														</Button>
													)
												}
											</Flex>

											{/* <Flex > */}
											<Image src={guard.icon} />
											{/* </Flex> */}

										</Flex>

										{
											!isActive && (
												<Button
													mt='0.5rem'
													color='black'
													variant='link'
													rightIcon={<Image src='Arrow-right.svg' />}
													onClick={() => guard.onMoreClick(isActive)}
												>
													More about this guard
												</Button>
											)
										}
									</Flex>
								</GridItem>
							)
						})
					}
				</Grid>
			</Flex>
			<Flex
				w='full'
				pl='5rem'
				bg='#00CC43'
				py='1.25rem'
				gap='4rem'
				pr='5rem'
			>
				<Box>
					<QuestbookLogo />
					<Text
						fontWeight='800'
						color='white'
						mt='4'>
						Connect with us on
					</Text>
					<HStack
						spacing={3}
						mt={4}>
						<Image src='/Facebook.svg' />
						<Image src='/Twitter.svg' />
						<Image src='/LinkedIn.svg' />
						<Image src='/YouTube.svg' />
						<Image src='/Instagram.svg' />
					</HStack>
					<Text
						color='white'
						mt='1.25rem'>
						2023
					</Text>
					<Text color='white'>
						Questbook. All Rights Reserved.
					</Text>
				</Box>
				<VStack
					spacing='1.25rem'
					align='left'>
					<Text
						fontWeight='800'
						color='white'>
						Company
					</Text>
					{
						companyItems.map((item, index) => (
							<ButtonComponent
								key={index}
								name={item.name}
								link={item.link} />
						))
					}
				</VStack>
				<VStack
					spacing='1.25rem'
					align='left'>
					<Text
						fontWeight='800'
						color='white'>
						Product
					</Text>
					{
						productItems.map((item, index) => (
							<ButtonComponent
								key={index}
								name={item.name}
								link={item.link} />
						))
					}
				</VStack>
				<VStack
					align='left'
					spacing='0.25rem'>
					<Text color='white'>
						992 San Antonio Road
					</Text>
					<Text color='white'>
						Palto Alto, CA 94303
					</Text>
					<Text color='white'>
						founders@questbook.app
					</Text>
				</VStack>
			</Flex>
		</Flex>
	)

	const router = useRouter()

	const guards = [
		{
			type: 'reviewer-guard',
			title: 'Reviewer Guard',
			description: 'Abort transaction if M out N reviews haven\'t been submitted by grant reviewers',
			icon: 'Brazuca_Sucess.svg',
			onMoreClick: (isActive: boolean) => {
				router.push({ pathname: '/reviewer_guard', query: isActive ? { edit: true } : {} })
			}
		},
		{
			type: 'compliance-guard',
			title: 'Compliance Guard',
			description: 'Abort transaction if the address belongs to a blacklist',
			icon: 'Fitz Report.svg',
			onMoreClick: () => {}
		},
		{
			type: 'gas-saving-guard',
			title: 'Gas Saving Guard',
			description: 'Abort transaction if the gas price is beyond a limit',
			icon: 'Go Green Electricity Power.svg',
			onMoreClick: () => {}
		},
		{
			type: 'milestone-payout-guard',
			title: 'Milestone Payout Guard',
			description: 'Abort transaction if the milestones are marked as not done by milestone reviewers',
			icon: 'Fitz Location.svg',
			onMoreClick: () => {}
		},
		{
			type: 'due-dilligence-guard',
			title: 'Due Dilligence Guard',
			description: 'Choose rubrics for your diligence. Abort transaction if rubric scores aren\'t met by the reviewers',
			icon: 'Isometric Stickers Magnifying Glass.svg',
			onMoreClick: () => {}
		},
		{
			type: 'custom-guard',
			title: 'Want a custom guard?',
			description: 'Reach out to our team with your request.',
			icon: 'Isometric Stickers Chat.svg',
			onMoreClick: () => {}
		}
	]

	const { address } = useAccount()
	const { chain } = useNetwork()

	return buildComponent()
}

const companyItems = [
	{
		name: 'About us',
		link: 'https://questbook.com/about',
	},
	{
		name: 'Docs',
		link: 'https://questbook.com/docs',
	},
	{
		name: 'Careers',
		link: 'https://questbook.com/careers',
	},
	{
		name: 'Brand Toolkit',
		link: 'https://questbook.com/brand-toolkit',
	},
]

const productItems = [
	{
		name: 'Grants Tool',
		link: 'https://questbook.com/',
	},
	{
		name: 'Releases',
		link: 'https://questbook.com/releases',
	},
	{
		name: 'Suport',
		link: 'https://questbook.com/support',
	},
]
Home.getLayout = function(page: ReactElement) {
	return (
		<NavbarLayout>
			{page}
		</NavbarLayout>
	)
}

export default Home
