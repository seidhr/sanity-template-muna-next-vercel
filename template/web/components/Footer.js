import {Box, Divider} from '@chakra-ui/react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <Box align="center" justify="space-between" wrap="wrap" marginTop="3em">
      <Divider />
      <footer className={styles.footer}>
        <h3>Muna + Sanity = 💚</h3>
        <a href="https://docs.muna.xyz/">Read Documentation</a>
      </footer>
    </Box>
  )
}
