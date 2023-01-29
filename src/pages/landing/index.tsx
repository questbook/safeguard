import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";
// import { GuardIcon } from "@/utils/assets/GuardIcon";
import { SafeGuard } from "@/utils/assets/SafeGuard";
import { QuestbookLogo } from "@/utils/assets/QuestbookLogo";
import { ButtonComponent } from "./ButtonComponent";

export default function Home() {
  const companyItems = [
    {
      name: "About us",
      link: "https://questbook.com/about",
    },
    {
      name: "Docs",
      link: "https://questbook.com/docs",
    },
    {
      name: "Careers",
      link: "https://questbook.com/careers",
    },
    {
      name: "Brand Toolkit",
      link: "https://questbook.com/brand-toolkit",
    },
  ];

  const productItems = [
    {
      name: "Grants Tool",
      link: "https://questbook.com/",
    },
    {
      name: "Releases",
      link: "https://questbook.com/releases",
    },
    {
      name: "Suport",
      link: "https://questbook.com/support",
    },
  ];

  return (
    <Container maxW="container.xl" p={0}>
      <Flex w="full" px="4">
        <SafeGuard />
        <Button ml="auto" color="white" bg="black" borderRadius={40}>
          {" "}
          Connect Wallet{" "}
        </Button>
      </Flex>
      <Flex justify="space-between" align={"center"} bg="#F5F5F5" px="70">
        <Flex direction={"column"} maxW="45%">
          <Heading
            as="h1"
            textColor="#00CC43"
            fontSize="60px"
            lineHeight={"72px"}
          >
            Financial Guards for your Safe
          </Heading>
          <Text mt="12" fontSize="32px" lineHeight={"40px"}>
            Your on-chain financial controllers for your Safes
          </Text>
        </Flex>
        <Image src="/guard-icon.svg" w="41%" />
      </Flex>
      <Flex
        mt="-20"
        w="full"
        p="20"
        bg="#13190D"
        justify="space-between"
        direction="column"
      >
        <Box mt="8">
          <Heading
            as="h1"
            fontSize="60px"
            lineHeight="72px"
            color="white"
            textAlign={"center"}
          >
            Own Your Safe. Own your{" "}
            <Heading
              as="h1"
              fontSize="60px"
              lineHeight="72px"
              color={"green"}
              display="inline-block"
            >
              Guard.
            </Heading>
          </Heading>
          <Text
            mt="4"
            fontSize="16px"
            lineHeight={"24px"}
            color="white"
            textAlign={"center"}
          >
            {" "}
            Here's a list of guards on SafeGuard. We will add more as we go.{" "}
            <Button
              color="green"
              variant="link"
              rightIcon={<Image src="Arrow-right-green.svg" />}
            >
              Request a Guard
            </Button>
          </Text>
        </Box>
        <Flex justify="space-between" gap={4} mt={16}>
          <Flex
            flex={2}
            bg="white"
            direction={"column"}
            borderRadius="8"
            align="start"
          >
            <Heading>Reviewer Guard</Heading>
            <Image src='Brazuca_Sucess.svg' />
            <Text>
              Set a guard which initiates payouts based on proposal reviews
            </Text>
            <Button
              color="black"
              variant="link"
              rightIcon={<Image src="Arrow-right.svg" />}
            >
              More about this guard
            </Button>
          </Flex>
          <Flex
            flex={1}
            bg="white"
            direction={"column"}
            borderRadius="8"
            align="start"
          >
            <Heading>Compliance Guard</Heading>
            <Image src='Hands_Access_Allowed.svg' />
            <Text>Set a guard which blocks payouts to denylist addresses.</Text>
            <Button
              color="black"
              variant="link"
              rightIcon={<Image src="Arrow-right.svg" />}
            >
              More about this guard
            </Button>
          </Flex>
        </Flex>

        <Flex justify={"space-between"} gap={4} mt={4}>
          <Flex
            flex={1}
            bg="white"
            direction={"column"}
            borderRadius="8"
            align="start"
          >
            <Heading>Gas Volatility Guard</Heading>
            <Image src='Hands_Access_Allowed.svg' />
            <Text>
              Set a guard for transactions to execute in gas price range.
            </Text>
            <Button
              color="black"
              variant="link"
              rightIcon={<Image src="Arrow-right.svg" />}
            >
              More about this guard
            </Button>
          </Flex>
          <Flex
            flex={2}
            bg="white"
            direction={"column"}
            borderRadius="8"
            align="start"
          >
            <Heading>Grant Guard</Heading>
            <Image src='Brazuca_Sucess.svg' />
            <Text>
              Set a guard which initiates payouts based on reached milestones
            </Text>
            <Button
              color="black"
              variant="link"
              rightIcon={<Image src="Arrow-right.svg" />}
            >
              More about this guard
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w="full"
        pl="10"
        bg="#00CC43"
        py="20"
        justify="space-between"
        pr="80"
      >
        <Box>
          <QuestbookLogo />
          <Text fontWeight={"800"} color={"white"} mt="4">
            Connect with us on
          </Text>
          <HStack spacing={3} mt={4}>
            <Image src="/Facebook.svg" />
            <Image src="/Twitter.svg" />
            <Image src="/LinkedIn.svg" />
            <Image src="/YouTube.svg" />
            <Image src="/Instagram.svg" />
          </HStack>
          <Text color={"white"} mt="20">
            2023
          </Text>
          <Text color={"white"}>Questbook. All Rights Reserved.</Text>
        </Box>
        <VStack spacing="20px" align="left">
          <Text fontWeight={"800"} color={"white"}>
            Company
          </Text>
          {companyItems.map((item) => (
            <ButtonComponent name={item.name} link={item.link} />
          ))}
        </VStack>
        <VStack spacing="20px" align="left">
          <Text fontWeight={"800"} color={"white"}>
            Product
          </Text>
          {productItems.map((item) => (
            <ButtonComponent name={item.name} link={item.link} />
          ))}
        </VStack>
        <VStack align={"left"} spacing="5">
          <Text color={"white"}>992 San Antonio Road</Text>
          <Text color={"white"}>Palto Alto, CA 94303</Text>
          <Text color={"white"}>founders@questbook.app</Text>
        </VStack>
      </Flex>
    </Container>
  );
}
