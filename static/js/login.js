import functionsBanco from "./bancodeDados.js";
import { personClass } from "./class.js";
import { avatar } from "./class.js";

functionsBanco.app();
functionsBanco.db();

let personClass = new Object;
let avatar = new Object

const bancoDados = functionsBanco.lerNo("Users");

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

console.table(personClass);
console.table(avatar);

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

module.exports = {personClass, avatar, bancoDados}