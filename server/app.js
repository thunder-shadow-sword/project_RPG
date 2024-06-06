import dotenv from "dotenv";
import app from './main.js';
import router from "./router.js";

dotenv.config();

app.set('view engine', 'ejs');

// server listen at PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is running!! On localhost:${process.env.PORT}`);
});