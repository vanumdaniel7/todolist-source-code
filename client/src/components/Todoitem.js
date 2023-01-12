import { useState, useRef } from "react";
import { Grid, GridItem, Input, Text, Flex, IconButton, Box, Center, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/index.js";
import Loader from "./Loader.js";

const Todoitem = props => {
    const toast = useToast();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const notify = res => {
        toast({
            position: "top",
            title: res.title,
            description: res.info,
            status: res.status,
            duration: 10000,
            isClosable: true,
        });
    }
    const updateHandler = async () => {
        if(isUpdating) {
            setIsLoading(true);
            setMsg("Updating todo...");
            const result = await fetch(`http://localhost:3000/${props.id}/updatetask`, {
                method: "PATCH",
                mode: "cors",
                body: JSON.stringify({ updatedTask: inputRef.current.value }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const res = await result.json();
            notify(res);
            dispatch(todoActions.updateTodo({ id: props.id, task: inputRef.current.value }));
            setIsLoading(false);
        }
        setIsUpdating(prevState => !prevState);
    }
    const deleteHandler = async () => {
        setIsLoading(true);
        setMsg("Removing todo...");
        const result = await fetch(`http://localhost:3000/${props.id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await result.json();
        notify(res);
        dispatch(todoActions.deleteTodo(props.id));
        setIsLoading(false);
    }
    const finishHandler = async () => {
        setIsLoading(true);
        setMsg("Marking as done...");
        const result = await fetch(`http://localhost:3000/${props.id}/finishtask`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await result.json();
        notify(res);
        dispatch(todoActions.finishTodo(props.id));
        setIsLoading(false);
    }
    return (
        <>
            {isLoading && <Loader msg = {msg}/>}
            <Box height = {props.status === "Active" ? "150px" : "110px"} width = "100%"  borderColor = "gray.200" borderWidth = "1px" boxShadow = "md" mt = "10px">
                <Grid width = "100%" height = "120px" templateRows = "repeat(3, 1fr)" templateColumns = "repeat(12, 1fr)">
                    <GridItem rowStart= "1" colStart = "1" rowSpan = "1" colSpan = "12">
                        <Center width = "100%" height = "100%">
                            <Input mt = {2} pl = {2} width = "95%" ref = {inputRef} defaultValue = {props.task} readOnly = {!isUpdating}/>
                        </Center>
                    </GridItem>
                    <GridItem rowStart= "2" colStart = "1" rowSpan = "1" colSpan = "8">
                        <Flex alignItems = "center" width = "100%" height = "100%">
                            <Text mt = {3} pl = "4%">Status: {props.status}</Text>
                        </Flex>
                    </GridItem>
                    {
                        props.status === "Completed" && 
                        <>
                            <GridItem rowStart = "2" colStart = "12" rowSpan = "1" colSpan = "1">
                                <Flex mt = {2} pr = "14%" alignItems = "center" width = "100%" height = "100%">
                                    <IconButton onClick = {deleteHandler} size = "sm" color = "white" backgroundColor = "blue.300" mr = "10px" children = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>/>
                                </Flex>  
                            </GridItem>
                        </>
                    }
                    {
                    props.status === "Active" && 
                        <>
                            <GridItem rowStart= "3" colStart = "1" rowSpan = "1" colSpan = "3">
                                <Flex mt = {2} pl = "12%" alignItems = "center" width = "100%" height = "100%">
                                    {props.status === "Active" && <IconButton onClick = {finishHandler} color = "white" backgroundColor = "blue.300" size = "sm" children = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>/>}
                                </Flex>
                            </GridItem>
                            <GridItem rowStart= "3" colStart = "9" rowSpan = "1" colSpan = "4">
                                <Flex mt = {2} pl = "12%" justifyContent = "right" height = "100%" width = "100%" minW = "100px">
                                    {props.status === "Active" && <IconButton size = "sm" color = "white" backgroundColor = "blue.300" mr = "10px" onClick = {updateHandler} children = {isUpdating ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.50005 1.05005C1.25152 1.05005 1.05005 1.25152 1.05005 1.50005C1.05005 1.74858 1.25152 1.95005 1.50005 1.95005L13.5 1.95005C13.7486 1.95005 13.95 1.74858 13.95 1.50005C13.95 1.25152 13.7486 1.05005 13.5 1.05005H1.50005ZM3.93188 7.43169C3.75614 7.60743 3.75614 7.89236 3.93188 8.06809C4.10761 8.24383 4.39254 8.24383 4.56827 8.06809L7.05007 5.58629V13.5C7.05007 13.7485 7.25155 13.95 7.50007 13.95C7.7486 13.95 7.95007 13.7485 7.95007 13.5L7.95007 5.58629L10.4319 8.06809C10.6076 8.24383 10.8925 8.24383 11.0683 8.06809C11.244 7.89235 11.244 7.60743 11.0683 7.43169L7.81827 4.18169C7.64254 4.00596 7.35761 4.00596 7.18188 4.18169L3.93188 7.43169Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> : <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>}/>}
                                    <IconButton onClick = {deleteHandler} size = "sm" color = "white" backgroundColor = "blue.300" mr = "10px" children = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>/>
                                </Flex>
                            </GridItem>
                        </>
                    }
                </Grid>
            </Box>
        </>
    )
}

export default Todoitem;