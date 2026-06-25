// src/screens/HomeScreen.js
// ============================================================
// MÀN HÌNH CHÍNH (SAU KHI ĐĂNG NHẬP)
// - Hiển thị thông tin tóm tắt người dùng
// - Hiển thị Push Token FCM & Expo Push Token
// - Nút điều hướng sang Profile
// - Nút Đăng Xuất
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

// ============================================================
// CẤU HÌNH HIỂN THỊ NOTIFICATION KHI APP ĐANG MỞ
// ============================================================
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ============================================================
// HÀM LẤY PUSH TOKEN FCM VÀ EXPO PUSH TOKEN
// ============================================================
async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log("Push Notifications chỉ hoạt động trên thiết bị thật!");
    return null;
  }

  // Kiểm tra và xin quyền thông báo
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Không thể nhận Push Notification vì quyền bị từ chối!");
    return null;
  }

  let expoPushToken = "";
  let devicePushToken = "";

  // 1. Lấy Native Device Token (FCM token trên Android, APNs trên iOS)
  try {
    const deviceTokenData = await Notifications.getDevicePushTokenAsync();
    devicePushToken = deviceTokenData.data;
  } catch (error) {
    console.log("Lỗi lấy Native Device Token (FCM):", error.message);
  }

  // 2. Lấy Expo Push Token (yêu cầu projectId nếu dùng EAS build)
  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    let token;
    if (projectId) {
      token = await Notifications.getExpoPushTokenAsync({ projectId });
    } else {
      token = await Notifications.getExpoPushTokenAsync();
    }
    expoPushToken = token.data;
  } catch (error) {
    console.log("Lỗi lấy Expo Push Token (Bỏ qua nếu chưa cài EAS):", error.message);
  }

  return { expoPushToken, devicePushToken };
}

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [pushToken, setPushToken] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const currentUser = auth.currentUser;
    let unsubscribeSnapshot = () => {};

    if (currentUser) {
      // Lắng nghe dữ liệu thời gian thực từ Firestore
      const docRef = doc(db, "users", currentUser.uid);
      unsubscribeSnapshot = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
          setLoading(false);
        },
        (error) => {
          console.log("Lỗi lắng nghe dữ liệu thời gian thực:", error);
          setLoading(false);
        }
      );

      // Đăng ký nhận Push Notification
      setupNotifications();
    } else {
      setLoading(false);
    }

    return () => {
      // Cleanup Firestore listener
      unsubscribeSnapshot();

      // Cleanup listeners khi component unmount
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  const setupNotifications = async () => {
    // Cấu hình channel cho Android
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#4A90D9",
      });
    }

    // Lấy tokens
    const tokens = await registerForPushNotificationsAsync();
    if (tokens) {
      setPushToken(tokens.expoPushToken || "");
      setFcmToken(tokens.devicePushToken || "");
      console.log("📱 Expo Push Token:", tokens.expoPushToken);
      console.log("🔥 Native FCM Token:", tokens.devicePushToken);
    }

    // Lắng nghe notification khi app đang mở (foreground)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notif) => {
        setNotification(notif);
        Alert.alert(
          `🔔 ${notif.request.content.title || "Thông Báo"}`,
          notif.request.content.body || "",
          [{ text: "OK" }]
        );
      });

    // Lắng nghe khi người dùng nhấn vào notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("📬 Người dùng nhấn notification:", response);
      });
  };

  // Gửi thông báo test ngay lập tức (để kiểm tra)
  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Test Notification!",
        body: "Push Notification đang hoạt động bình thường!",
        data: { screen: "Home" },
      },
      trigger: null, // Gửi ngay lập tức
    });
  };

  // Đăng xuất
  const handleLogout = () => {
    Alert.alert("🚪 Đăng Xuất", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng Xuất",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            Alert.alert("❌ Lỗi", "Không thể đăng xuất: " + error.message);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90D9" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <View style={styles.banner}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {userData?.email?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.welcomeText}>Xin chào! 👋</Text>
        <Text style={styles.emailText}>{userData?.email || "Người dùng"}</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 Thông Tin Tài Khoản</Text>

        <InfoRow
          icon="📧"
          label="Email"
          value={userData?.email || "Chưa cập nhật"}
        />
        <InfoRow
          icon="📱"
          label="Điện thoại"
          value={userData?.phone || "Chưa cập nhật"}
        />
        <InfoRow
          icon="🏠"
          label="Địa chỉ"
          value={userData?.address || "Chưa cập nhật"}
        />
      </View>

      {/* Push Token Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔔 Push Notification</Text>

        {fcmToken ? (
          <>
            <Text style={styles.tokenLabel}>🔥 Native FCM Token (dùng với Firebase Console):</Text>
            <View style={styles.tokenBox}>
              <Text style={styles.tokenText} selectable>
                {fcmToken}
              </Text>
            </View>
          </>
        ) : null}

        {pushToken ? (
          <>
            <Text style={styles.tokenLabel}>📱 Expo Push Token:</Text>
            <View style={styles.tokenBox}>
              <Text style={styles.tokenText} selectable>
                {pushToken}
              </Text>
            </View>
          </>
        ) : null}

        {!fcmToken && !pushToken ? (
          <Text style={styles.noToken}>
            ⚠️ Không lấy được Push Token.{"\n"}Hãy chạy trên thiết bị thật và kiểm tra quyền thông báo!
          </Text>
        ) : (
          <TouchableOpacity
            style={styles.testButton}
            onPress={sendTestNotification}
          >
            <Text style={styles.testButtonText}>
              🧪 Gửi Test Notification
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.profileButtonText}>✏️ Cập Nhật Thông Tin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>🚪 Đăng Xuất</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

// Component hiển thị từng dòng thông tin
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
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
  banner: {
    backgroundColor: "#16213e",
    alignItems: "center",
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#0f3460",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A90D9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#4A90D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  emailText: {
    fontSize: 15,
    color: "#8888aa",
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#0f3460",
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  infoIcon: {
    fontSize: 22,
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#8888aa",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#ffffff",
  },
  tokenLabel: {
    fontSize: 13,
    color: "#8888aa",
    marginTop: 6,
    marginBottom: 6,
  },
  tokenBox: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  tokenText: {
    fontSize: 12,
    color: "#4A90D9",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  testButton: {
    backgroundColor: "#0f3460",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4A90D9",
    marginTop: 6,
  },
  testButtonText: {
    color: "#4A90D9",
    fontWeight: "bold",
    fontSize: 15,
  },
  noToken: {
    color: "#ffaa00",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  profileButton: {
    backgroundColor: "#4A90D9",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    margin: 16,
    marginBottom: 10,
    shadowColor: "#4A90D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  profileButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#16213e",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e94560",
  },
  logoutButtonText: {
    color: "#e94560",
    fontSize: 17,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 30,
  },
});
