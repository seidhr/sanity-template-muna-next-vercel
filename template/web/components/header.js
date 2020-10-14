import Link from 'next/link'
import { Flex, Box, Spacer, Button, Heading, Text, useColorMode } from "@chakra-ui/core"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { CMS_NAME } from '../lib/constants'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <header>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
      >
        <Flex
          align="center" 
          mr={5}
        >
          <Heading fontSize="lg">
            <Link href="/">
              <a>{CMS_NAME}</a>
            </Link>
          </Heading>
        </Flex>

        <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
          <svg
            fill="black"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <MenuItems><Link href="/items">Items</Link></MenuItems>
          <MenuItems><Link href="/actors">Actors</Link></MenuItems>
          <MenuItems><Link href="/about">About</Link></MenuItems>
          <Spacer />
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? 
              <MoonIcon /> : 
              <SunIcon />
            }
          </Button>
        </Box>
        
      </Flex>
    </header>
  )
}
