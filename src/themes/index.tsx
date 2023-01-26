import { extendTheme } from '@chakra-ui/react'
import text from 'src/themes/_components/text'
import colors from 'src/themes/colors'

const theme = extendTheme({ colors, components: { ...text } })

export default theme