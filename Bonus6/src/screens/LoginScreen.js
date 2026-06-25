// src/screens/LoginScreen.js
// ============================================================
// MÀN HÌNH ĐĂNG NHẬP
// - Đăng nhập bằng Email + Password qua Firebase Auth
// - Validation cơ bản
// - Điều hướng sang Register
// ============================================================

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ---- Validation ----
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("❌ Lỗi", "Vui lòng nhập email!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("❌ Lỗi", "Email không hợp lệ!");
      return false;
    }
    if (!password) {
      Alert.alert("❌ Lỗi", "Vui lòng nhập mật khẩu!");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("❌ Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
      return false;
    }
    return true;
  };

  // ---- Xử lý đăng nhập ----
  const handleLogin = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Sau khi đăng nhập thành công, AppNavigator tự động chuyển sang AppStack
    } catch (error) {
      let message = "Đăng nhập thất bại!";
      switch (error.code) {
        case "auth/user-not-found":
          message = "Email chưa được đăng ký!";
          break;
        case "auth/wrong-password":
          message = "Mật khẩu không đúng!";
          break;
        case "auth/invalid-email":
          message = "Email không hợp lệ!";
          break;
        case "auth/too-many-requests":
          message = "Quá nhiều lần thử. Vui lòng thử lại sau!";
          break;
        case "auth/invalid-credential":
          message = "Email hoặc mật khẩu không đúng!";
          break;
        default:
          message = error.message;
      }
      Alert.alert("❌ Đăng Nhập Thất Bại", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🔐</Text>
          <Text style={styles.title}>Đăng Nhập</Text>
          <Text style={styles.subtitle}>Chào mừng bạn quay trở lại!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📧 Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập email của bạn"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔑 Mật Khẩu</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Đăng Nhập</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Register Link */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>
              Chưa có tài khoản?{" "}
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8888aa",
  },
  form: {
    backgroundColor: "#16213e",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#4A90D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#8888aa",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#0f3460",
    borderRadius: 12,
    padding: 16,
    color: "#ffffff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#1a4480",
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#0f3460",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1a4480",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: "#ffffff",
    fontSize: 16,
  },
  eyeButton: {
    padding: 16,
  },
  eyeText: {
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: "#4A90D9",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#4A90D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2a2a4e",
  },
  dividerText: {
    color: "#666",
    marginHorizontal: 16,
    fontSize: 14,
  },
  registerButton: {
    alignItems: "center",
  },
  registerText: {
    color: "#8888aa",
    fontSize: 15,
  },
  registerLink: {
    color: "#4A90D9",
    fontWeight: "bold",
  },
});
