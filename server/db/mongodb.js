const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: path.join(__dirname, "..", "env") });
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(process.env.URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 
});

module.exports = {
    connect: async () => {
        await client.connect();
    },
    createtodoCollection: async () => {
        const db = client.db("todolist");
        await db.createCollection("todoCollection");
    },
    createTodo: async newTask => {
        const db = client.db("todolist");
        const collection = db.collection("todoCollection");
        const id = uuidv4();
        const result = await collection.insertOne({ id: id, task: newTask, status: "Active" });
        return {
            id: id,
            status: "success",
            title: "Success",
            info: "Todo added successfully"
        }
    },
    readTodo: async () => {
        const db = client.db("todolist");
        const collection = db.collection("todoCollection");
        const allTodos = await collection.find({}).toArray();
        return { 
            data: allTodos,
            status: "success",
            title: "Success",
            info: "Todos fetched successfully" 
        };
    },
    updateTodo: async (id, updatedTask) => {
        const db = client.db("todolist");
        const collection = db.collection("todoCollection");
        await collection.updateOne({ id: id }, { $set: { task: updatedTask } });
        return {
            status: "success",
            title: "Success",
            info: "Todo updated successfully"
        }
    },
    deleteTodo: async id => {
        const db = client.db("todolist");
        const collection = db.collection("todoCollection");
        await collection.deleteOne({ id: id });
        return {
            status: "success",
            title: "Success",
            info: "Todo deleted successfully"
        }
    },
    finishTodo: async id => {
        const db = client.db("todolist");
        const collection = db.collection("todoCollection");
        await collection.updateOne({ id: id }, { $set: { status: "Completed" }});
        return {
            status: "success",
            title: "Success",
            info: "Todo marked as completed"
        }
    }
}