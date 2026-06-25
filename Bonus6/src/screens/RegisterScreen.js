// src/screens/RegisterScreen.js
// ============================================================
// MÀN HÌNH ĐĂNG KÝ
// - Đăng ký tài khoản mới bằng Email + Password
// - Tạo document trong Firestore theo uid
// - Validation đầy đủ
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (password !== confirmPassword) {
      Alert.alert("❌ Lỗi", "Mật khẩu xác nhận không khớp!");
      return false;
    }
    if (phone && !/^[0-9]{10,11}$/.test(phone.trim())) {
      Alert.alert("❌ Lỗi", "Số điện thoại phải có 10-11 chữ số!");
      return false;
    }
    return true;
  };

  // ---- Xử lý đăng ký ----
  const handleRegister = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      // 1. Tạo tài khoản Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      // 2. Lưu thông tin người dùng vào Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email.trim(),
        phone: phone.trim() || "",
        address: address.trim() || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      Alert.alert(
        "✅ Thành Công",
        "Tài khoản đã được tạo thành công! Chào mừng bạn!",
        [{ text: "OK" }]
      );
      // AppNavigator tự động chuyển sang AppStack
    } catch (error) {
      let message = "Đăng ký thất bại!";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Email này đã được sử dụng!";
          break;
        case "auth/invalid-email":
          message = "Email không hợp lệ!";
          break;
        case "auth/weak-password":
          message = "Mật khẩu quá yếu! Hãy dùng ít nhất 6 ký tự.";
          break;
        default:
          message = error.message;
      }
      Alert.alert("❌ Đăng Ký Thất Bại", message);
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
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Đăng Ký</Text>
          <Text style={styles.subtitle}>Tạo tài khoản mới của bạn</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📧 Email *</Text>
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

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔑 Mật Khẩu * (tối thiểu 6 ký tự)</Text>
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

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔐 Xác Nhận Mật Khẩu *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Text style={styles.eyeText}>{showConfirm ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📱 Số Điện Thoại (tùy chọn)</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại (10-11 số)"
              placeholderTextColor="#666"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🏠 Địa Chỉ (tùy chọn)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Nhập địa chỉ của bạn"
              placeholderTextColor="#666"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Tạo Tài Khoản</Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>
              Đã có tài khoản?{" "}
              <Text style={styles.backLink}>Đăng nhập</Text>
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
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  emoji: {
    fontSize: 56,
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
    shadowColor: "#e94560",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#8888aa",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: "#0f3460",
    borderRadius: 12,
    padding: 16,
    color: "#ffffff",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#1a4480",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
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
    fontSize: 15,
  },
  eyeButton: {
    padding: 16,
  },
  eyeText: {
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: "#e94560",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#e94560",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  backButton: {
    alignItems: "center",
    marginTop: 20,
  },
  backText: {
    color: "#8888aa",
    fontSize: 15,
  },
  backLink: {
    color: "#e94560",
    fontWeight: "bold",
  },
});
