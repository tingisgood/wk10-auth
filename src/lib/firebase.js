// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAkhpM8W-XqWL9v4cj_1OeQ335Y3LqM9A",
  authDomain: "wk10-main.firebaseapp.com",
  projectId: "wk10-main",
  storageBucket: "wk10-main.firebasestorage.app",
  messagingSenderId: "359075339084",
  appId: "1:359075339084:web:c14474dadf51f056930de9",
  measurementId: "G-NK0M9FXB5T"
};

// 初始化 App
const app = initializeApp(firebaseConfig);

// 匯出 Auth（前端要用的）
export const auth = getAuth(app);
export default app;


