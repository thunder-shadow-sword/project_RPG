import dotenv from "dotenv";
import express from 'express';
import path from 'path';
import router from "./router.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Configura o mecanismo de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura middleware para servir arquivos estáticos
app.use('/static', express.static(path.join(__dirname, 'static')));

// Configura middleware para analisar o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

export default app;