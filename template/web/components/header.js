import Link from 'next/link'
import { Flex, Button, Heading, useColorMode } from "@chakra-ui/core"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { CMS_NAME } from '../lib/constants'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
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
          as="nav"
        >
          <Heading fontSize="xl">
            <Link href="/">
              <a>{CMS_NAME}</a>
            </Link>
          </Heading>
        </Flex>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? 
            <MoonIcon /> : 
            <SunIcon />
          }
        </Button>
      </Flex>
    </header>
  )
}
