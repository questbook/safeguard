import { extendTheme } from '@chakra-ui/react'
import button from 'src/themes/_components/button'
import text from 'src/themes/_components/text'
import colors from 'src/themes/colors'

const theme = extendTheme({ colors, components: { ...text, ...button } })

export default theme