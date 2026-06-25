// src/navigation/AppNavigator.js
// ============================================================
// ĐIỀU HƯỚNG CHÍNH CỦA ỨNG DỤNG
// Quản lý 2 luồng: Auth (chưa đăng nhập) và App (đã đăng nhập)
// ============================================================

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

// Stack dành cho người dùng chưa đăng nhập
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Stack dành cho người dùng đã đăng nhập
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1a1a2e" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "🏠 Trang Chủ" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "👤 Hồ Sơ Cá Nhân" }}
      />
    </Stack.Navigator>
  );
}

// Navigator chính - tự động chuyển đổi giữa Auth và App
export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe thay đổi trạng thái đăng nhập
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener khi component unmount
    return unsubscribe;
  }, []);

  // Hiển thị loading khi đang kiểm tra auth state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90D9" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
});
