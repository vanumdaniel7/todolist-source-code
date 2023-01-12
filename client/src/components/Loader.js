import { Spinner, VStack, Text } from "@chakra-ui/react";

const Loader = props => {
    return (
        <VStack width = "100vw" height = "100vh" zIndex = "10000" backgroundColor = "white" position = "fixed" top = "0px" left = "0px">
            <Text color = "blue.300" position = "relative" top = "10%" fontSize = "20px" fontWeight = "400">{props.msg}</Text>
            <Spinner position = "relative" top = "40%" size = "xl" transform = "translateY(-50%)"/>
        </VStack>
    )
}

export default Loader;