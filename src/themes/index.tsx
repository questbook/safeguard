import { extendTheme } from "@chakra-ui/react"
import colors from "./colors"
import text from "./_components/text"

const theme = extendTheme({ colors, components: { ...text } })

export default theme