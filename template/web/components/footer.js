import { Box } from '@chakra-ui/core'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    
      <Box
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        borderTop="1px" 
        borderColor="gray.200"
      >
        <footer className={styles.footer}>
          <h3>
            Muna + Sanity = 💚
          </h3>
          <a href="https://docs.muna.xyz/">
            Read Documentation
          </a>
        </footer>
      </Box>
  )
}
