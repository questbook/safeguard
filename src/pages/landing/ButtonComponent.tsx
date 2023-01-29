import { Button } from "@chakra-ui/react"

interface props {
    name: string,
    link?: string
}

export function ButtonComponent({name, link}: props) {
    return (
    <Button color='white' variant='link' justifyContent={"flex-start"}>{name}</Button>)
}