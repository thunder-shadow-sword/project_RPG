// Carrega as variáveis de ambiente do arquivo .env
import dotenv from "dotenv";
import express from 'express';
import path from 'path';
import router from "./router.js";
const app = express();
const __dirname = path.resolve();

// Configura o mecanismo de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

dotenv.config();

export default app;