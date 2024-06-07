class Dados {
  constructor(userName, avatar, locAvatar, idadeAvatar, tipeGender) {
    this.player = userName;
    this.name = avatar;
    this.origem = locAvatar;
    this.idade = idadeAvatar;
    this.gender = tipeGender;
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
    this.tamanho = tamVle;
    this.forca = forVle;
    this.constituicao = conVle;
    this.destreza = desVle;
    this.aparencia = carVle;
    this.inteligencia = intVle;
    this.educacao = eduVle;
    this.poder = podVle;
    this.sorte = sorVle;
    this.percepcao = perVle;
  }
}

class Classe {
  constructor(classVle) {
    this.classe = classVle;
  }
}

class Others {
  constructor(lvl, qtdPoints, qtdExp1, qtdExp0) {
    this.nivel = lvl;
    this.points = qtdPoints;
    this.experienceF = qtdExp1;
    this.experienceI = qtdExp0;
    this.lifeI = 0;
    this.lifeF = 0;
  }
}

class Person {
  constructor(user, password, email, phone, name) {
    this.username = user;
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }
}

export { Dados, Atributes, Classe, Others, Person };
