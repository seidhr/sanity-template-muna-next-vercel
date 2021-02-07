import React from 'react'
import Link from 'next/link'
import {Flex, Box, Spacer, Button, Heading, Text, useColorMode, Icon} from '@chakra-ui/react'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import {CMS_NAME} from '../lib/constants'
import ActiveLink from './ActiveLink'
import {BsArrowUpLeft} from 'react-icons/bs'

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
    <Flex 
      as="header" 
      align="center" 
      w="full" 
      justify="space-between" 
      wrap="wrap" 
      position="absolute"
      color="white"
      zIndex="999"
    >
      
      <Flex 
        align="center" 
        p="1.5rem"
        color="white" 
        /* bg="red.600" */
        bg="black"
        px="2" 
        py="1"
        w="full"
        opacity="100%"
      >
        <Heading fontSize="sm" fontWeight="500">
          <Link href="http://marcus.uib.no/">
            <a><Icon as={BsArrowUpLeft} /> tilbake til Marcus</a>
          </Link>
        </Heading>
      </Flex>

      <Flex 
        align="center" 
        px="1em" 
        pt="1em" 
        color="white" 
        bg="black" 
        w="full"
        opacity="0.8"
      >
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
        as="nav"
        px="1em"
        pb="1em"
        display={{base: show ? 'block' : 'none', sm: show ? 'block' : 'none', md: 'flex'}}
        width={{base: 'auto', sm: 'full', md: 'full'}}
        align="center"
        color="white" 
        bg="black" 
        opacity="0.8"
        flexGrow={1}
      >
        <Flex
          display={{base: show ? 'block' : 'none', sm: show ? 'block' : 'none', md: 'flex'}}
          width={{base: 'auto', sm: 'full', md: 'full'}}
          align="center"
          flexGrow={1}
          wrap={{sm: 'no-wrap', md: "wrap"}}
        >
          {menu?.items &&
            menu.items.map((item) => (
              <MenuItems key={item._key}>
                <ActiveLink href={`/${item.route}`} activeClassName="active">
                  <a>{item.label}</a>
                </ActiveLink>
              </MenuItems>
            ))
          }
        </Flex>
        <Spacer />
        <MenuItems>
          <ActiveLink href={`/actors`} activeClassName="active">
            <a>Aktører</a>
          </ActiveLink>
        </MenuItems>
        <MenuItems>
          <ActiveLink href={`/items`} activeClassName="active">
            <a>Ting</a>
          </ActiveLink>
        </MenuItems>
        <MenuItems>
          <ActiveLink href={`/concepts`} activeClassName="active">
            <a>Register</a>
          </ActiveLink>
        </MenuItems>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  )
}
