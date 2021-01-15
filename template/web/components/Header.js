import React from 'react'
import Link from 'next/link'
import {Flex, Box, Spacer, Button, Heading, Text, useColorMode} from '@chakra-ui/react'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import {CMS_NAME} from '../lib/constants'

const MenuItems = ({children}) => (
  <Text mt={{base: 4, md: 0}} mr={6} mb="0" display="block">
    {children}
  </Text>
)

export default function Header({menu}) {
  const {colorMode, toggleColorMode} = useColorMode()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  console.log(menu)

  return (
    <header>
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem">
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
                <Link href={`/${item.route}`}>
                  <a>{item.label}</a>
                </Link>
              </MenuItems>
            ))}
          <Spacer />
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </header>
  )
}
