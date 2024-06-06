import { v4 as uuidv4 } from 'uuid';
import bancodeDados from "./bancodeDados.js";
import personClass from "./class.js";
//import classesObj from "./classes.js";

bancodeDados.app();

const id = uuidv4();
console.log(id);

const db = bancodeDados.lerNo("Users");

const atributosTypes = [
  "tamanho",
  "forca",
  "constituicao",
  "destreza",
  "aparencia",
  "inteligencia",
  "educacao",
  "poder",
  "sorte",
  "percepcao",
];

let avatar = () => personClass;
avatar = avatar();

const popup = document.querySelector("div.popup.active");
const btn_criar = document.querySelector("#btn_criar");
const btn_logar = document.querySelector("#btn_logar");

btn_criar.addEventListener("click", () => {
  const dadosPlayer = document.querySelector(".dadosPlayer");
  avatar.dados.player = `${document.querySelector("#user").value}`;
  popup.toggleAttribute("hidden");
  dadosPlayer.textContent += ` ${avatar.dados.player}`;
  avatar = avatar;
  bancodeDados.criarNo(`Users/${id}`, avatar);
  return avatar; 
});

btn_logar.addEventListener("click", () => {
  const dadosPlayer = document.querySelector(".dadosPlayer");
  popup.toggleAttribute("hidden");
  return avatar;
});