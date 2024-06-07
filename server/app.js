import dotenv from "dotenv";
import app from './main.js';

dotenv.config();

app.set('view engine', 'ejs');

// server listen at PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running!! On localhost:${PORT}`);
});