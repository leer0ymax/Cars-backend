// import app from ".";



// app.listen(3000, () => console.log("Server running on port 3000"));


import app from "./index";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT ;
app.listen(port, () => {

    console.log(`Server is running on port http://localhost:${port}`);
}) 