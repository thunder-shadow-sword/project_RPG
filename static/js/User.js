import { v4 as uuidv4 } from "uuid";
import { Dados, Atributes, Classe, Others, Person } from "./class.js";

let personClass = {};
let avatar = {};

personClass.person = new Person(null, null, null, null, null);
avatar.dados = new Dados(null, undefined, undefined, undefined, undefined);
avatar.other = new Others(1, 600, 100, 0);
avatar.atributos = new Atributes(0, 0, 0, 0, 0, 0, 0, 0, 0);
avatar.classe = new Classe(undefined);

let user = { "id": uuidv4(), "pessoa": personClass.person, avatar };

const getUser = () => user;

export default getUser;