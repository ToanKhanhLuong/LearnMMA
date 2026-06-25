// src/screens/ProfileScreen.js
// ============================================================
// MÀN HÌNH HỒ SƠ & CẬP NHẬT THÔNG TIN
// - Xem thông tin hiện tại
// - Cập nhật: email, phone, address
// - Lưu vào Firestore theo uid
// - Validation cơ bản
// ============================================================

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, []);

  // ---- Tải dữ liệu từ Firestore ----
  const loadUserData = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setEmail(data.email || currentUser.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
      }
    } catch (error) {
      Alert.alert("❌ Lỗi", "Không thể tải thông tin: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- Validation ----
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("❌ Lỗi", "Email không được để trống!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("❌ Lỗi", "Email không hợp lệ!");
      return false;
    }
    if (phone.trim() && !/^[0-9]{10,11}$/.test(phone.trim())) {
      Alert.alert("❌ Lỗi", "Số điện thoại phải có 10-11 chữ số!");
      return false;
    }
    if (newPassword && newPassword.length < 6) {
      Alert.alert("❌ Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự!");
      return false;
    }
    if (newPassword && !currentPassword) {
      Alert.alert(
        "❌ Lỗi",
        "Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu mới!"
      );
      return false;
    }
    return true;
  };

  // ---- Lưu thông tin ----
  const handleSave = async () => {
    if (!validateInputs()) return;
    setSaving(true);
    try {
      // Nếu muốn đổi mật khẩu hoặc email, cần xác thực lại
      const isEmailChanged = email.trim() !== currentUser.email;
      const isPasswordChanged = newPassword.length > 0;

      if ((isEmailChanged || isPasswordChanged) && currentPassword) {
        // Reauthenticate trước khi thay đổi email/password nhạy cảm
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);

        // Cập nhật Email trên Firebase Auth
        if (isEmailChanged) {
          await updateEmail(currentUser, email.trim());
        }

        // Cập nhật Password
        if (isPasswordChanged) {
          await updatePassword(currentUser, newPassword);
        }
      }

      // Cập nhật Firestore
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          uid: currentUser.uid,
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Reset trường mật khẩu
      setNewPassword("");
      setCurrentPassword("");

      Alert.alert("✅ Thành Công", "Thông tin đã được cập nhật!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      let message = "Cập nhật thất bại!";
      switch (error.code) {
        case "auth/wrong-password":
          message = "Mật khẩu hiện tại không đúng!";
          break;
        case "auth/email-already-in-use":
          message = "Email này đã được sử dụng!";
          break;
        case "auth/requires-recent-login":
          message =
            "Phiên đăng nhập đã hết hạn. Vui lòng đăng xuất và đăng nhập lại!";
          break;
        case "auth/invalid-email":
          message = "Email không hợp lệ!";
          break;
        default:
          message = error.message;
      }
      Alert.alert("❌ Cập Nhật Thất Bại", message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90D9" />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Header */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {email?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.uidText}>
            UID: {currentUser?.uid?.substring(0, 12)}...
          </Text>
        </View>

        {/* Thông tin cơ bản */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Thông Tin Cơ Bản</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>📧 Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.hint}>
              ⚠️ Đổi email cần nhập mật khẩu hiện tại bên dưới
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>📱 Số Điện Thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại (10-11 số)"
              placeholderTextColor="#666"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>🏠 Địa Chỉ</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Nhập địa chỉ"
              placeholderTextColor="#666"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Đổi mật khẩu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Bảo Mật (Tùy Chọn)</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔑 Mật Khẩu Hiện Tại</Text>
            <Text style={styles.hint}>
              Bắt buộc nếu bạn muốn đổi email hoặc mật khẩu
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập mật khẩu hiện tại"
                placeholderTextColor="#666"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPwd}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrentPwd(!showCurrentPwd)}
              >
                <Text style={styles.eyeText}>
                  {showCurrentPwd ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔒 Mật Khẩu Mới (để trống nếu không đổi)</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập mật khẩu mới (min 6 ký tự)"
                placeholderTextColor="#666"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPwd}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNewPwd(!showNewPwd)}
              >
                <Text style={styles.eyeText}>{showNewPwd ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Lưu Thay Đổi</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>↩️ Quay Lại</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
  loadingText: {
    color: "#8888aa",
    marginTop: 12,
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A90D9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#4A90D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  uidText: {
    fontSize: 12,
    color: "#8888aa",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  section: {
    backgroundColor: "#16213e",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#0f3460",
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#8888aa",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  hint: {
    color: "#ffaa00",
    fontSize: 11,
    marginBottom: 6,
    fontStyle: "italic",
  },
  input: {
    backgroundColor: "#0f3460",
    borderRadius: 12,
    padding: 14,
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
    padding: 14,
    color: "#ffffff",
    fontSize: 15,
  },
  eyeButton: {
    padding: 14,
  },
  eyeText: {
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#4A90D9",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#4A90D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#16213e",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a4e",
  },
  cancelButtonText: {
    color: "#8888aa",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 30,
  },
});
