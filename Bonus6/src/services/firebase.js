// src/services/firebase.js
// ============================================================
// CẤU HÌNH FIREBASE - THAY THẾ CÁC GIÁ TRỊ BẰNG CONFIG CỦA BẠN
// ============================================================
// Hướng dẫn lấy config:
// 1. Vào https://console.firebase.google.com
// 2. Chọn project > Project Settings > General
// 3. Kéo xuống "Your apps" > Web app > firebaseConfig
// ============================================================

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️  THAY THẾ BẰNG CONFIG FIREBASE CỦA BẠN
const firebaseConfig = {
  apiKey: "AIzaSyA78GqgFIC9Iij79-qcDViYDb3R3FOe168",
  authDomain: "bonus6-2c4ea.firebaseapp.com",
  projectId: "bonus6-2c4ea",
  storageBucket: "bonus6-2c4ea.firebasestorage.app",
  messagingSenderId: "335855528189",
  appId: "1:335855528189:web:c68f471d26a9f0cd223694",
  measurementId: "G-B4MRXBR334"
};

// Khởi tạo Firebase (tránh khởi tạo nhiều lần)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Khởi tạo Auth với AsyncStorage để lưu trạng thái đăng nhập
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Nếu đã khởi tạo rồi thì lấy instance hiện có
  auth = getAuth(app);
}

// Khởi tạo Firestore
const db = getFirestore(app);

export { app, auth, db };
