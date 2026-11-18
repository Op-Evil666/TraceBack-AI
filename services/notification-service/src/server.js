import dotenv from "dotenv";
dotenv.config();

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");
const PORT = process.env.PORT || 8002;

const startServer = async () =>{
    try{
        await connectDB();
        app.listen(PORT, "0.0.0.0", () =>{
            console.log(`Server is running on port url: http://localhost:${PORT}`);
        });
    }
    catch(error){
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
}

startServer();