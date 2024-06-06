import { initializeApp } from "firebase/app";
import { ref, set, get, update, remove } from "firebase/database";
import * as admin from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config();

import serviceAccount from `${process.env.SERVICE_ACCOUNT}`;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.database();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Criar
async function criarNo(no = no == null ? "" : no,dados) {
  const novaRef = ref(db, `/${no}`);
  await set(novaRef, dados);
}

// Ler
async function lerNo(no = no == null ? "" : no) {
  const refDados = ref(db, `/${no}`);
  const snapshot = await get(refDados);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("Nenhum dado disponível");
  }
}

// Atualizar
async function atualizarNo(no = no == null ? "" : no, dados) {
  const refAtualizar = ref(db, `/${no}`);
  await update(refAtualizar, dados);
}

// Deletar
async function deletarNo(no = no == null ? "" : no) {
  const refDeletar = ref(db, `/${no}`);
  await remove(refDeletar);
}

let bancodeDados = {
  app,
  criarNo,
  lerNo,
  atualizarNo,
  deletarNo
}

export default bancodeDados;