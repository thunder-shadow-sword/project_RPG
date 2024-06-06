import uuid from "uuid";

class Dados {
  constructor(id, userName, avatar, locAvatar, idadeAvatar, tipeGender) {
    (this.avatar = id),
    (this.player = userName),
    (this.name = avatar),
    (this.origem = locAvatar),
    (this.idade = idadeAvatar),
    (this.gender = tipeGender);
  }
}

class Atributes {
  constructor(
    tamVle,
    forVle,
    conVle,
    desVle,
    carVle,
    intVle,
    eduVle,
    podVle,
    sorVle,
    perVle
  ) {
    (this.tamanho = tamVle),
      (this.forca = forVle),
      (this.constituicao = conVle),
      (this.destreza = desVle),
      (this.aparencia = carVle),
      (this.inteligencia = intVle),
      (this.educacao = eduVle),
      (this.poder = podVle),
      (this.sorte = sorVle),
      (this.percepcao = perVle);
  }
}

class Classe {
  constructor(classVle) {
    this.classe = classVle;
  }
}

class Others {
  constructor(lvl, qtdPoints, qtdExp1 ,qtdExp0) {
    this.nível = lvl,
    this.points = qtdPoints,
    this.experienceF = qtdExp1,
    this.experienceI = qtdExp0,
    this.lifeI = 0,
    this.lifeF = 0;
  }
}

let personClass = new Object;
personClass.dados =new Dados(uuid.v5(),null,undefined,undefined,undefined,undefined);
personClass.other = new Others(1 ,600, 100, 0);
personClass.atributos = new Atributes(0,0,0,0,0,0,0,0,0,0);
personClass.classe = new Classe(undefined);

export default personClass;