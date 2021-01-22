import React from 'react'
import Link from 'next/link'
import {Flex, Box, Spacer, Button, Heading, Text, useColorMode} from '@chakra-ui/react'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import {CMS_NAME} from '../lib/constants'
import ActiveLink from './ActiveLink'

const MenuItems = ({children}) => (
  <Text mt={{base: 4, md: 0}} mr={6} mb="0" display="block">
    {children}
  </Text>
)

export default function Header({menu}) {
  const {colorMode, toggleColorMode} = useColorMode()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <header className="dark:bg-gray-900">
      <Flex as="nav" align="center" w="full" justify="space-between" wrap="wrap" padding="1.5rem">
        <Flex align="center" mr={5}>
          <Heading fontSize="xl">
            <Link href="/">
              <a>{CMS_NAME}</a>
            </Link>
          </Heading>
        </Flex>

        <Box display={{sm: 'block', md: 'none'}} onClick={handleToggle}>
          <svg fill="black" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Flex
          display={{base: show ? 'block' : 'none', sm: show ? 'block' : 'none', md: 'flex'}}
          width={{base: 'full', sm: 'full', md: 'auto'}}
          align="center"
          flexGrow={1}
        >
          {menu?.items &&
            menu.items.map((item) => (
              <MenuItems key={item._key}>
                <ActiveLink href={`/${item.route}`} activeClassName="active">
                  <a>{item.label}</a>
                </ActiveLink>
              </MenuItems>
            ))}
          <Spacer />
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <button id="switchTheme" class="h-10 w-10 flex justify-center items-center focus:outline-none text-yellow-500">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>
            </button>
        </Flex>
      </Flex>
    </header>
  )
}
