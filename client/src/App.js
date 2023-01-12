import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header.js";
import Loader from "./components/Loader.js";
import Todoinput from "./components/Todoinput.js";
import Todolist from "./components/Todolist.js";
import { todoActions } from "./store/index.js";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    useEffect(() => {
        const readAllTodos = async () => {
            setIsLoading(true);
            const result = await fetch("http://localhost:3000/", {
                method: "GET",
                mode: "cors",
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
            dispatch(todoActions.getAllTodos(res.data));
            setIsLoading(false);
        }
        readAllTodos();
    }, [toast, dispatch]);
    return (
        <>
            {isLoading && <Loader msg = "Fetching data..."/>}
            <Header/>
            <Todoinput/>
            <Todolist/>
        </>
    )
}

export default App;