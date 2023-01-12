import { Tab, TabList, TabPanels, Tabs, TabPanel, Center, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Todoitem from "./Todoitem.js";

const Todolist = () => {
    const todos = useSelector(state => state.todo.data);
    return (
        <Center width = "100%">
            <Box width = "95%" maxW = "500px">
                <Tabs>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Active</Tab>
                        <Tab>Completed</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {todos.map(todo => <Todoitem key = {todo.id} id = {todo.id} task = {todo.task} status = {todo.status}/>)}
                        </TabPanel>
                        <TabPanel>
                            {todos.map(todo => {
                                if(todo.status === "Active") {
                                    return <Todoitem key = {todo.id} id = {todo.id} task = {todo.task} status = {todo.status}/>
                                }
                            })}
                        </TabPanel>
                        <TabPanel>
                            {todos.map(todo => {
                                if(todo.status === "Completed") {
                                    return <Todoitem key = {todo.id} id = {todo.id} task = {todo.task} status = {todo.status}/>
                                }
                            })}
                        </TabPanel>  
                    </TabPanels>
                </Tabs>
            </Box>
        </Center>
        
        
    )
}

export default Todolist;