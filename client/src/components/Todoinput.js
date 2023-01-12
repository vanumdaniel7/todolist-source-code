import { Input, Flex, Center, useToast, Button, Spinner } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/index.js";

const Todoinput = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const createHandler = async event => {
        event.preventDefault();
        setIsLoading(true);
        const result = await fetch("http://localhost:3000/", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ newTask: inputRef.current.value }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await result.json();
        toast({
            position: "top",
            title: res.title,
            description: res.info,
            status: res.status,
            duration: 10000,
            isClosable: true,
        });
        dispatch(todoActions.createTodo({task: inputRef.current.value, id: res.id }));
        inputRef.current.value = "";
        setIsLoading(false);
    }
    return (
        <form onSubmit = {createHandler}>
            <Center width = "100%" height = "80px">
                <Flex width = "90%" maxW = "500px" height = "40px" gap = "5px">
                    <Input width = "75%" required = {true} ref = {inputRef} type = "text" height = "100%" borderWidth = "1px"/>
                    <Button disabled = {isLoading} type = "submit" backgroundColor = "blue.300" color = "white" width = "25%" minW = "100px" height = "100%">{isLoading ? <Spinner/> : "Add todo"}</Button>
                </Flex>
            </Center>
        </form>
    )
}

export default Todoinput;