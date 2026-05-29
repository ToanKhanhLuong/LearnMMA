import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const menu = [
    {
      icon: require("../../../assets/iconProfile/icon_my_profile.png"),
      title: "My Profile",
    },
    {
      icon: require("../../../assets/iconProfile/icon_setting.png"),
      title: "Settings",
    },
    {
      icon: require("../../../assets/iconProfile/icon_support_my_profile.png"),
      title: "Support",
    },
    {
      icon: require("../../../assets/iconProfile/icon_faq_my_profile.png"),
      title: "FAQ",
    },
    {
      icon: require("../../../assets/iconProfile/icon_profile_admin.png"),
      title: "Admin",
    },
    {
      icon: require("../../../assets/iconProfile/icon_logout.png"),
      title: "Logout",
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/iconallapp/bg_banner_profile_male.png")}
        style={styles.banner}
        imageStyle={{ borderRadius: 6 }}
      ></ImageBackground>

      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </View>

        <View style={styles.camera}>
          <Image
            source={require("../../../assets/iconProfile/icon_capture_image.png")}
            style={styles.cameraIcon}
          />
        </View>
      </View>

      <Text style={styles.name}>Lương Khánh Toàn (TOANLK04)</Text>
      <Text style={styles.role}>(BM SE)</Text>

      <View style={styles.menuBox}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              item.title === "Logout" && { borderBottomWidth: 0 },
            ]}
          >
            <Image source={item.icon} style={styles.menuIcon} />

            <Text style={styles.menuText}>{item.title}</Text>

            {item.title !== "Logout" && <Text style={styles.arrow}>›</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>myFPT Version 5.9.10</Text>
        <Text style={styles.footerText}>Copyright @ FPT Software 2021</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingTop: 50,
  },

  banner: {
    height: 105,
    backgroundColor: "#2F80ED",
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  bannerText: {
    fontSize: 90,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.08)",
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: -52,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E7F7FF",
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#1C9DE3",
  },

  camera: {
    position: "absolute",
    bottom: 6,
    right: "36%",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#8A8A8A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  cameraIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  name: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },

  role: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 13,
    color: "#666",
  },

  menuBox: {
    marginTop: 35,
  },

  menuItem: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  menuIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 16,
  },

  menuText: {
    flex: 1,
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
  },

  arrow: {
    fontSize: 28,
    color: "#BDBDBD",
    marginRight: 4,
  },

  footer: {
    marginTop: 55,
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#A0A0A0",
    marginTop: 4,
  },
});
