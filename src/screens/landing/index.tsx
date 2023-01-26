import { Flex } from '@chakra-ui/react'
import ConnectWalletModal from './_components/ConnectWalletModal'

export default function Home() {
  return (
    <Flex w='100%' h='40px' bg='brand.400'><ConnectWalletModal /></Flex>
  )
}
