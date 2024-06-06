import personClass from "./class.js";
//import classesObj from "./classes.js";

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

const initInformations = () => {
  let dadosValues = [];
  const inputData = document.querySelectorAll("#dados>div>input, #gender");
  const dadosNome = document.querySelector(".dadosNome");
  const dadosOrigem = document.querySelector(".dadosOrigem");
  const dadosIdade = document.querySelector(".dadosIdade");
  const dadosGenero = document.querySelector(".dadosGenero");

  inputData.forEach((i) => {
    dadosValues.push(i.value);
    i.toggleAttribute("hidden");
  });

  avatar.dados.name = dadosValues[0];
  avatar.dados.origem = dadosValues[1];
  avatar.dados.idade = dadosValues[2];
  avatar.dados.gender = dadosValues[3];

  dadosNome.textContent += ` ${avatar.dados.name}`;
  dadosOrigem.textContent += ` ${avatar.dados.origem}`;
  dadosIdade.textContent += ` ${avatar.dados.idade}`;
  dadosGenero.textContent += ` ${avatar.dados.gender}`;

  sendDados.toggleAttribute("hidden");

  return avatar;
};

const sendDados = document.querySelector("#dados>input");
sendDados.addEventListener("click", initInformations);

const reviewPontos = () => {
  const dataOther = `Pontos disponíveis: ${avatar.other.points} pontos`;
  document.querySelector(
    "#atributos>div.atributosAvatar>p.dadosPontos",
  ).textContent = dataOther;
  document.querySelector(".dadosExp").textContent =
    `Experiência: ${avatar.other.experienceI}/${avatar.other.experienceF}`;
  document.querySelector(".dadosLvl").textContent = `Nível: ${
    avatar.other.nível < 9 ? `0${avatar.other.nível}` : `${avatar.other.nível}`
  }`;
  return avatar;
};

const updateAttribute = (index, value) => {
  switch (index) {
    case 1:
    case 2:
    case 3:
      index = 0;
      break;
    // 0
    case 4:
    case 5:
    case 6:
    case 7:
      index = 1;
      break;
    // 1
    case 8:
    case 9:
    case 10:
    case 11:
      index = 2;
      break;
    // 2
    case 12:
    case 13:
    case 14:
    case 15:
      index = 3;
      break;
    // 3
    case 16:
    case 17:
    case 18:
    case 19:
      index = 4;
      break;
    // 4
    case 20:
    case 21:
    case 22:
    case 23:
      index = 5;
      break;
    // 5
    case 24:
    case 25:
    case 26:
    case 27:
      index = 6;
      break;
    // 6
    case 28:
    case 29:
    case 30:
    case 31:
      index = 7;
      break;
    // 7
    case 32:
    case 33:
    case 34:
    case 35:
      index = 8;
      break;
    // 8
    case 36:
    case 37:
    case 38:
    case 39:
      index = 9;
      break;
    // 9
    default:
      index = 0;
      break;
  }

  const attributeName = atributosTypes[index];
  avatar.atributos[attributeName] += value;
  document.querySelector(`.display${attributeName}`).textContent =
    avatar.atributos[attributeName];
  avatar.other.points -= value;
  reviewPontos();
};

// Função que adiciona eventos de clique aos botões dentro de #atributos
const addAttributesEv = () => {
  const buttons = document.querySelectorAll("#atributos button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const value = parseInt(button.value);
      const remainingPoints = avatar.other.points - value;

      if (remainingPoints < 0) {
        console.log("Impossível aumentar o status!");
        alert("Por favor, reduza algum atributo para poder aumentar outro!");
      } else {
        updateAttribute(index, value);
      }
    });
  });
};

// Adiciona os eventos de clique aos botões
addAttributesEv();
reviewPontos();