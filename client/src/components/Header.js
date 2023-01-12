import { Center, Heading } from "@chakra-ui/react"

const Header = () => {
    return (
        <Center width = "100%" height = "80px">
            <Heading fontSize = "40px" fontWeight = "400" color = "blue.300">Todolist</Heading>
        </Center>
    )
}

export default Header;